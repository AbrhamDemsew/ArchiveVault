import { useAppContext } from '../context/AppContext';
import { useArchiveStore } from '../hooks/useArchiveStore';

export function SettingsPage() {
  const { flags, toggleFlag, resetArchive } = useArchiveStore();
  const { denseTables, setDenseTables } = useAppContext();

  return (
    <section className="page">
      <article className="panel">
        <h2>Collections registrar preferences</h2>
        <label className="check-label">
          <input type="checkbox" checked={denseTables} onChange={(event) => setDenseTables(event.target.checked)} />
          <span>Use compact tables</span>
        </label>
      </article>
      <article className="panel">
        <h2>Feature flags</h2>
        <ul className="flag-list">
          {flags.map((flag) => (
            <li key={flag.key}>
              <label className="check-label">
                <input type="checkbox" checked={flag.enabled} onChange={() => toggleFlag(flag.key)} />
                <span>
                  <strong>{flag.label}</strong>
                  <span className="muted"> — {flag.description}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </article>
      <article className="panel">
        <h2>Reset demo archive</h2>
        <p className="muted">Restore the original seeded artifacts, exhibits, and loans on this browser.</p>
        <button type="button" className="button danger" onClick={resetArchive}>Reset archive</button>
      </article>
    </section>
  );
}
