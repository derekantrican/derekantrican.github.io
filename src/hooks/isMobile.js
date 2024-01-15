import { useLayoutEffect, useState } from 'react';

export function useIsMobile() {
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return width <= 768;
};