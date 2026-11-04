import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { giveawayApi, imageSrc, storage } from "../utils/giveawayApi";
import { compressImage } from "../utils/compressImage";
import { Lightbox, Spinner } from "./Giveaway";
import '../styles/giveaway.css';

const PASSWORD_KEY = 'giveaway-admin-password';
const UPLOAD_CONCURRENCY = 3; // decoding many 12MP photos at once can exhaust phone memory

export function GiveawayAdmin() {
  const [password, setPassword] = useState(() => storage.get(PASSWORD_KEY));
  const [authState, setAuthState] = useState(password ? 'checking' : 'signedOut');

  useEffect(() => {
    if (authState !== 'checking') return;
    giveawayApi.admin.check(password)
      .then(() => setAuthState('signedIn'))
      .catch(e => {
        if (e.status === 401) storage.set(PASSWORD_KEY, null);
        setAuthState(e.status === 401 ? 'signedOut' : 'error');
      });
  }, [authState, password]);

  const signOut = () => {
    storage.set(PASSWORD_KEY, null);
    setPassword(null);
    setAuthState('signedOut');
  };

  if (authState === 'checking') return <div className="ga-page"><div className="ga-empty"><Spinner/></div></div>;
  if (authState === 'error') {
    return (
      <div className="ga-page">
        <div className="ga-empty">
          Couldn't reach the server.
          <div><button className="ga-btn ghost" onClick={() => setAuthState('checking')}>Retry</button></div>
        </div>
      </div>
    );
  }
  if (authState === 'signedOut') {
    return <Login onSuccess={pw => { storage.set(PASSWORD_KEY, pw); setPassword(pw); setAuthState('signedIn'); }}/>;
  }
  return <AdminDashboard password={password} onUnauthorized={signOut} onSignOut={signOut}/>;
}

function Login({ onSuccess }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await giveawayApi.admin.check(value);
      onSuccess(value);
    } catch (err) {
      setError(err.status === 401 ? 'Wrong password' : err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ga-page ga-login">
      <form className="ga-dialog" onSubmit={submit}>
        <h2><i className="bi bi-lock"/> Giveaway admin</h2>
        <input className={`ga-input ${error ? 'invalid' : ''}`} type="password" autoComplete="current-password"
          placeholder="Password" value={value} onChange={e => setValue(e.target.value)} autoFocus/>
        {error ? <p className="ga-error">{error}</p> : null}
        <div className="ga-dialog-actions">
          <button className="ga-btn primary" type="submit" disabled={!value || submitting}>
            {submitting ? <Spinner/> : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}

const FILTERS = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'reserved', label: 'Reserved', test: i => i.reservations.length > 0 },
  { key: 'undescribed', label: 'No description', test: i => !i.description.trim() },
  { key: 'hidden', label: 'Hidden', test: i => i.hidden },
];

function AdminDashboard({ password, onUnauthorized, onSignOut }) {
  const [items, setItems] = useState(null);
  const [uploads, setUploads] = useState([]); // [{ key, preview, status, error, file }]
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const fileInput = useRef(null);
  const queue = useRef([]);
  const active = useRef(0);

  const handleError = useCallback(e => {
    if (e.status === 401) onUnauthorized();
    else alert(e.message);
  }, [onUnauthorized]);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      setItems(await giveawayApi.admin.getItems(password));
    } catch (e) {
      handleError(e);
    } finally {
      setRefreshing(false);
    }
  }, [password, handleError]);

  useEffect(() => { load(); }, [load]);

  // Pick up new reservations when coming back to the tab
  useEffect(() => {
    const onVisible = () => document.visibilityState === 'visible' && load();
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [load]);

  const updateUpload = (key, changes) =>
    setUploads(prev => prev.map(u => u.key === key ? { ...u, ...changes } : u));

  const runUpload = async upload => {
    try {
      updateUpload(upload.key, { status: 'compressing', error: null });
      const { image, thumb } = await compressImage(upload.file);
      updateUpload(upload.key, { status: 'uploading' });
      const item = await giveawayApi.admin.createItem(password, { image, thumb });
      setItems(prev => [item, ...(prev || [])]);
      setUploads(prev => prev.filter(u => u.key !== upload.key));
      URL.revokeObjectURL(upload.preview);
    } catch (e) {
      if (e.status === 401) return onUnauthorized();
      updateUpload(upload.key, { status: 'error', error: e.message });
    }
  };

  const pump = () => {
    while (active.current < UPLOAD_CONCURRENCY && queue.current.length) {
      const next = queue.current.shift();
      active.current++;
      runUpload(next).finally(() => { active.current--; pump(); });
    }
  };

  const enqueue = list => {
    queue.current.push(...list);
    pump();
  };

  const onFilesPicked = e => {
    const files = Array.from(e.target.files || []);
    e.target.value = ''; // allow picking the same files again
    const newUploads = files.map((file, i) => ({
      key: `${Date.now()}-${i}-${file.name}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'queued',
    }));
    setUploads(prev => [...newUploads, ...prev]);
    enqueue(newUploads);
  };

  const retry = upload => {
    updateUpload(upload.key, { status: 'queued', error: null });
    enqueue([upload]);
  };

  const dismissUpload = upload => {
    URL.revokeObjectURL(upload.preview);
    setUploads(prev => prev.filter(u => u.key !== upload.key));
  };

  const patchItem = (id, changes) => setItems(prev => prev.map(i => i.id === id ? { ...i, ...changes } : i));

  const saveItem = async (id, changes) => {
    await giveawayApi.admin.updateItem(password, id, changes);
    patchItem(id, changes);
  };

  const deleteItem = async item => {
    if (!window.confirm('Delete this item? Its photo and any reservations will be removed.')) return;
    try {
      await giveawayApi.admin.deleteItem(password, item.id);
      setItems(prev => prev.filter(i => i.id !== item.id));
    } catch (e) { handleError(e); }
  };

  const removeReservation = async (item, email) => {
    if (!window.confirm(`Remove ${email}'s reservation?`)) return;
    try {
      await giveawayApi.admin.removeReservation(password, item.id, email);
      patchItem(item.id, { reservations: item.reservations.filter(r => r.email !== email) });
    } catch (e) { handleError(e); }
  };

  const counts = useMemo(() => Object.fromEntries(
    FILTERS.map(f => [f.key, items ? items.filter(f.test).length : 0])), [items]);
  const visible = items ? items.filter(FILTERS.find(f => f.key === filter).test) : null;
  const activeUploads = uploads.filter(u => u.status !== 'error').length;

  return (
    <div className="ga-page">
      <header className="ga-admin-header">
        <div>
          <h1>Giveaway admin</h1>
          <p className="ga-muted">
            {items ? `${items.length} items · ${counts.reserved} reserved` : 'Loading…'}
            {' · '}<a href="/giveaway" target="_blank" rel="noreferrer">View public page</a>
          </p>
        </div>
        <div className="ga-admin-header-actions">
          <button className="ga-btn ghost icon" onClick={load} disabled={refreshing} aria-label="Refresh">
            <i className={`bi bi-arrow-clockwise ${refreshing ? 'ga-spin' : ''}`}/>
          </button>
          <button className="ga-btn ghost" onClick={onSignOut}>Sign out</button>
        </div>
      </header>

      <div className="ga-content">
        <button className="ga-upload-zone" onClick={() => fileInput.current.click()}>
          <i className="bi bi-images"/>
          <span><b>Add photos</b></span>
          <span className="ga-muted">
            {activeUploads ? `Uploading ${activeUploads} photo${activeUploads === 1 ? '' : 's'}…` : 'Pick as many as you like — each photo becomes an item'}
          </span>
        </button>
        <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={onFilesPicked}/>

        <div className="ga-segmented ga-filters">
          {FILTERS.map(f => (
            <button key={f.key} className={filter === f.key ? 'active' : ''} onClick={() => setFilter(f.key)}>
              {f.label} ({counts[f.key]})
            </button>
          ))}
        </div>

        {!visible ? <div className="ga-empty"><Spinner/></div> : (
          <div className="ga-grid admin">
            {filter === 'all' ? uploads.map(u => (
              <article key={u.key} className="ga-card ga-uploading">
                <div className="ga-thumb">
                  <img src={u.preview} alt=""/>
                  <div className={`ga-upload-state ${u.status}`}>
                    {u.status === 'error' ? (
                      <>
                        <i className="bi bi-exclamation-triangle"/>
                        <span>{u.error}</span>
                        <div className="ga-upload-error-actions">
                          <button className="ga-btn primary small" onClick={() => retry(u)}>Retry</button>
                          <button className="ga-btn ghost small" onClick={() => dismissUpload(u)}>Dismiss</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Spinner/>
                        <span>{u.status === 'queued' ? 'Waiting…' : u.status === 'compressing' ? 'Compressing…' : 'Uploading…'}</span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            )) : null}
            {visible.map(item => (
              <AdminItemCard
                key={item.id}
                item={item}
                onOpen={() => setLightbox(item)}
                onSave={changes => saveItem(item.id, changes)}
                onDelete={() => deleteItem(item)}
                onRemoveReservation={email => removeReservation(item, email)}
                onError={handleError}
              />
            ))}
            {visible.length === 0 && (filter !== 'all' || uploads.length === 0) ? (
              <div className="ga-empty ga-grid-empty">
                {filter === 'all' ? 'No items yet. Add some photos to get started.' : 'Nothing matches this filter.'}
              </div>
            ) : null}
          </div>
        )}
      </div>

      {lightbox ? <Lightbox item={lightbox} onClose={() => setLightbox(null)}/> : null}
    </div>
  );
}

function AdminItemCard({ item, onOpen, onSave, onDelete, onRemoveReservation, onError }) {
  const [draft, setDraft] = useState(item.description);
  const [saveState, setSaveState] = useState(null); // 'saving' | 'saved' | null
  const focused = useRef(false);

  // Keep in sync with refreshes, unless the description is being edited
  useEffect(() => {
    if (!focused.current) setDraft(item.description);
  }, [item.description]);

  useEffect(() => {
    if (saveState !== 'saved') return;
    const timer = setTimeout(() => setSaveState(null), 1500);
    return () => clearTimeout(timer);
  }, [saveState]);

  const saveDescription = async () => {
    focused.current = false;
    if (draft === item.description) return;
    setSaveState('saving');
    try {
      await onSave({ description: draft });
      setSaveState('saved');
    } catch (e) {
      setSaveState(null);
      onError(e);
    }
  };

  const toggleHidden = async () => {
    try { await onSave({ hidden: !item.hidden }); } catch (e) { onError(e); }
  };

  return (
    <article className={`ga-card ${item.hidden ? 'is-hidden' : ''}`}>
      <button className="ga-thumb" onClick={onOpen} aria-label="View larger photo">
        <img src={imageSrc(item.thumbUrl)} alt={item.description || 'Giveaway item'} loading="lazy"/>
        {item.hidden ? <span className="ga-badge"><i className="bi bi-eye-slash"/> Hidden</span> : null}
        {item.reservations.length ? <span className="ga-badge mine">{item.reservations.length} reserved</span> : null}
      </button>
      <div className="ga-card-body">
        <div className="ga-desc-edit">
          <textarea
            className="ga-input"
            rows={2}
            placeholder="Add a description…"
            value={draft}
            onFocus={() => { focused.current = true; }}
            onChange={e => setDraft(e.target.value)}
            onBlur={saveDescription}
            onKeyDown={e => (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) && e.target.blur()}
          />
          {saveState ? <span className="ga-save-state">{saveState === 'saving' ? 'Saving…' : <><i className="bi bi-check-lg"/> Saved</>}</span> : null}
        </div>

        {item.reservations.length ? (
          <ol className="ga-reservations">
            {item.reservations.map(r => (
              <li key={r.email}>
                <a href={`mailto:${r.email}`}>{r.email}</a>
                <span className="ga-muted ga-res-date">{new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                <button className="ga-icon-btn" aria-label={`Remove ${r.email}`} onClick={() => onRemoveReservation(r.email)}>
                  <i className="bi bi-x"/>
                </button>
              </li>
            ))}
          </ol>
        ) : <p className="ga-muted ga-no-res">No reservations yet</p>}

        <div className="ga-actions split">
          <button className="ga-btn ghost small" onClick={toggleHidden}>
            <i className={`bi ${item.hidden ? 'bi-eye' : 'bi-eye-slash'}`}/> {item.hidden ? 'Show' : 'Hide'}
          </button>
          <button className="ga-btn danger small" onClick={onDelete}><i className="bi bi-trash"/> Delete</button>
        </div>
      </div>
    </article>
  );
}
