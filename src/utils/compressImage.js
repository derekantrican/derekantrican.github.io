// Resize + re-encode a photo in the browser before uploading, so a 4–12 MB phone
// photo becomes a few hundred KB (full) plus a small thumbnail for the grid.

async function decode(file) {
  // createImageBitmap is fast and respects EXIF orientation with this option
  if (window.createImageBitmap) {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch { /* fall back to <img> (older Safari) */ }
  }

  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function encode(source, maxSize, quality) {
  const width = source.width;
  const height = source.height;
  const scale = Math.min(1, maxSize / Math.max(width, height));

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      // Release the canvas memory right away (matters on phones doing many at once)
      canvas.width = canvas.height = 0;
      blob ? resolve(blob) : reject(new Error('Could not encode image'));
    }, 'image/jpeg', quality);
  });
}

function toDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export async function compressImage(file) {
  let source;
  try {
    source = await decode(file);
  } catch {
    throw new Error("This browser can't read that photo format");
  }

  try {
    const image = await encode(source, 1600, 0.8);
    const thumb = await encode(source, 600, 0.72);
    return {
      image: await toDataUrl(image),
      thumb: await toDataUrl(thumb),
      bytes: image.size + thumb.size,
    };
  } finally {
    source.close?.();
  }
}
