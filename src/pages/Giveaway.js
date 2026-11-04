import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { giveawayApi, imageSrc, isValidEmail, storage } from "../utils/giveawayApi";
import '../styles/giveaway.css';

const EMAIL_KEY = 'giveaway-email';

export function Giveaway() {
  const [items, setItems] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [email, setEmail] = useState(() => storage.get(EMAIL_KEY) || '');
  const [mine, setMine] = useState({}); // { [itemId]: place in line }
  const [busy, setBusy] = useState({}); // { [itemId]: true } while a request is in flight
  const [pendingItem, setPendingItem] = useState(null); // item waiting on an email before reserving
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState(null);

  const emailValid = isValidEmail(email);
  const normalizedEmail = email.trim().toLowerCase();

  const showToast = useCallback((message, kind = 'error') => {
    setToast({ message, kind, key: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    giveawayApi.getItems()
      .then(setItems)
      .catch(() => setLoadError("Couldn't load the giveaway items. Please refresh to try again."));
  }, []);

  // Remember a valid email and load which items it has already reserved
  useEffect(() => {
    if (!emailValid) {
      setMine({});
      return;
    }
    storage.set(EMAIL_KEY, normalizedEmail);
    let cancelled = false;
    const timer = setTimeout(() => {
      giveawayApi.getMine(normalizedEmail)
        .then(result => !cancelled && setMine(result))
        .catch(() => {});
    }, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [emailValid, normalizedEmail]);

  const setItemCount = (id, reservationCount) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, reservationCount } : i));

  const reserve = async (item, withEmail = normalizedEmail) => {
    setBusy(b => ({ ...b, [item.id]: true }));
    try {
      const { position, reservationCount } = await giveawayApi.reserve(item.id, withEmail);
      setMine(m => ({ ...m, [item.id]: position }));
      setItemCount(item.id, reservationCount);
    } catch (e) {
      showToast(e.status === 404 ? 'Sorry, that item is no longer available.' : "Couldn't reserve that item. Please try again.");
    } finally {
      setBusy(b => ({ ...b, [item.id]: false }));
    }
  };

  const unreserve = async (item) => {
    setBusy(b => ({ ...b, [item.id]: true }));
    try {
      const { reservationCount } = await giveawayApi.unreserve(item.id, normalizedEmail);
      setMine(({ [item.id]: _removed, ...rest }) => rest);
      setItemCount(item.id, reservationCount);
    } catch {
      showToast("Couldn't cancel that reservation. Please try again.");
    } finally {
      setBusy(b => ({ ...b, [item.id]: false }));
    }
  };

  const onReserveClick = (item) => {
    if (emailValid) reserve(item);
    else setPendingItem(item);
  };

  const myCount = Object.keys(mine).length;
  const visibleItems = useMemo(() => {
    if (!items) return null;
    return filter === 'mine' ? items.filter(i => mine[i.id]) : items;
  }, [items, filter, mine]);

  return (
    <div className="ga-page">
      <header className="ga-hero">
        <h1>Giveaway</h1>
        <p>
          As Helene & I prepare to move across the world, we're going through our belongings and choosing what to keep,
          what to store, and what to give away. Below is everything we're giving away — free to a good home.
        </p>
        <p className="ga-muted">
          Tap <b>Reserve</b> on anything you'd like and we'll email you to arrange pickup. If someone already
          reserved an item, you can still join the waitlist in case it falls through. Tap a photo to see it bigger.
        </p>
      </header>

      <div className="ga-toolbar">
        <div className="ga-toolbar-inner">
          <label className={`ga-email ${email && !emailValid ? 'invalid' : ''} ${emailValid ? 'valid' : ''}`}>
            <i className="bi bi-envelope"/>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Your email (so we can contact you)"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {emailValid ? <i className="bi bi-check-circle-fill ga-email-ok"/> : null}
          </label>
          <div className="ga-segmented" role="tablist">
            <button role="tab" aria-selected={filter === 'all'} className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}>
              All{items ? ` (${items.length})` : ''}
            </button>
            <button role="tab" aria-selected={filter === 'mine'} className={filter === 'mine' ? 'active' : ''}
              onClick={() => setFilter('mine')}>
              My reservations ({myCount})
            </button>
          </div>
        </div>
      </div>

      <main className="ga-content">
        {loadError ? <div className="ga-empty">{loadError}</div>
          : !visibleItems ? <SkeletonGrid/>
          : visibleItems.length === 0 ? (
            <div className="ga-empty">
              {filter === 'mine' ? "You haven't reserved anything yet." : 'Nothing here right now — check back soon!'}
            </div>
          ) : (
            <div className="ga-grid">
              {visibleItems.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  position={mine[item.id]}
                  busy={!!busy[item.id]}
                  onReserve={() => onReserveClick(item)}
                  onCancel={() => unreserve(item)}
                  onOpen={() => setLightbox(item)}
                />
              ))}
            </div>
          )}
      </main>

      {pendingItem ? (
        <EmailPrompt
          item={pendingItem}
          initialEmail={email}
          onCancel={() => setPendingItem(null)}
          onSubmit={value => {
            setEmail(value);
            const item = pendingItem;
            setPendingItem(null);
            reserve(item, value.trim().toLowerCase());
          }}
        />
      ) : null}

      {lightbox ? <Lightbox item={lightbox} onClose={() => setLightbox(null)}/> : null}
      {toast ? <div key={toast.key} className={`ga-toast ${toast.kind}`}>{toast.message}</div> : null}
    </div>
  );
}

function ItemCard({ item, position, busy, onReserve, onCancel, onOpen }) {
  const reservedByMe = !!position;
  const othersCount = item.reservationCount - (reservedByMe ? 1 : 0);

  let status = null;
  if (reservedByMe) {
    status = position === 1 ? "It's yours! We'll be in touch." : `You're #${position} on the waitlist`;
  } else if (othersCount > 0) {
    status = othersCount === 1 ? 'Reserved by someone — waitlist open' : `Reserved — ${othersCount} people in line`;
  }

  return (
    <article className={`ga-card ${reservedByMe ? 'mine' : ''}`}>
      <button className="ga-thumb" onClick={onOpen} aria-label="View larger photo">
        <img src={imageSrc(item.thumbUrl)} alt={item.description || 'Giveaway item'} loading="lazy"/>
        {othersCount > 0 && !reservedByMe ? <span className="ga-badge">Reserved</span> : null}
        {reservedByMe ? <span className="ga-badge mine"><i className="bi bi-check-lg"/> Yours</span> : null}
      </button>
      <div className="ga-card-body">
        {item.description ? <p className="ga-desc">{item.description}</p> : null}
        {status ? <p className={`ga-status ${reservedByMe ? 'mine' : ''}`}>{status}</p> : null}
        <div className="ga-actions">
          {reservedByMe ? (
            <button className="ga-btn ghost" disabled={busy} onClick={onCancel}>
              {busy ? <Spinner/> : 'Cancel reservation'}
            </button>
          ) : (
            <button className={`ga-btn ${othersCount > 0 ? 'secondary' : 'primary'}`} disabled={busy} onClick={onReserve}>
              {busy ? <Spinner/> : othersCount > 0 ? 'Join waitlist' : 'Reserve'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function EmailPrompt({ item, initialEmail, onCancel, onSubmit }) {
  const [value, setValue] = useState(initialEmail);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef(null);
  const valid = isValidEmail(value);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEscape(onCancel);

  return (
    <div className="ga-overlay" onMouseDown={e => e.target === e.currentTarget && onCancel()}>
      <form className="ga-dialog" noValidate onSubmit={e => {
        e.preventDefault();
        setTouched(true);
        if (valid) onSubmit(value);
      }}>
        <img className="ga-dialog-thumb" src={imageSrc(item.thumbUrl)} alt=""/>
        <h2>What's your email?</h2>
        <p className="ga-muted">We'll use it to contact you about pickup. You'll only need to enter it once.</p>
        <input
          ref={inputRef}
          className={`ga-input ${touched && !valid ? 'invalid' : ''}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        {touched && !valid ? <p className="ga-error">Please enter a valid email address.</p> : null}
        <div className="ga-dialog-actions">
          <button type="button" className="ga-btn ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="ga-btn primary">Reserve</button>
        </div>
      </form>
    </div>
  );
}

export function Lightbox({ item, onClose }) {
  const [fullLoaded, setFullLoaded] = useState(false);
  useEscape(onClose);
  return (
    <div className="ga-overlay ga-lightbox" onClick={onClose}>
      {/* Thumbnail shows instantly underneath while the full image loads */}
      <div className="ga-lightbox-frame">
        {fullLoaded ? null : <img className="ga-lightbox-thumb" src={imageSrc(item.thumbUrl)} alt=""/>}
        <img className="ga-lightbox-full" src={imageSrc(item.imageUrl)} alt={item.description || 'Giveaway item'}
          onLoad={() => setFullLoaded(true)}/>
      </div>
      {item.description ? <div className="ga-lightbox-caption">{item.description}</div> : null}
      <button className="ga-lightbox-close" aria-label="Close" onClick={onClose}><i className="bi bi-x-lg"/></button>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="ga-grid">
      {Array.from({ length: 8 }, (_, i) => <div key={i} className="ga-card ga-skeleton"><div className="ga-thumb"/></div>)}
    </div>
  );
}

export function Spinner() {
  return <span className="ga-spinner" aria-label="Loading"/>;
}

export function useEscape(handler) {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && handler();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handler]);
}
