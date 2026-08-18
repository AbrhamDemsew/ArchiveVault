import { useMemo, useState } from 'react';
import { helpArticles } from '../content/helpArticles';
import { policyLibrary } from '../content/policyLibrary';
import { sopLibrary } from '../content/sopLibrary';
import type { ArchiveDocument } from '../types/archive';
import { matchesQuery } from '../utils/format';

export function HelpPage() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(helpArticles[0]?.id ?? '');
  const documents = useMemo(() => [...helpArticles, ...policyLibrary, ...sopLibrary], []);
  const filtered = useMemo(
    () => documents.filter((doc) => matchesQuery(`${doc.title} ${doc.summary} ${doc.body}`, query)),
    [documents, query],
  );
  const selected: ArchiveDocument | undefined = filtered.find((doc) => doc.id === selectedId) ?? filtered[0];

  return (
    <section className="page help-layout">
      <aside className="help-index">
        <div className="field">
          <label htmlFor="help-query">Search procedures</label>
          <input id="help-query" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <ul className="plain-list">
          {filtered.map((doc) => (
            <li key={doc.id}>
              <button type="button" className={doc.id === selected?.id ? 'nav-button is-active' : 'nav-button'} onClick={() => setSelectedId(doc.id)}>
                <span>{doc.title}</span>
                <span className="nav-description">{doc.category}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {selected ? (
        <article className="panel help-article">
          <p className="eyebrow">{selected.category}</p>
          <h2>{selected.title}</h2>
          <p className="muted">Updated {selected.updatedAt}</p>
          <p>{selected.summary}</p>
          {selected.body.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
      ) : (
        <p className="empty">No articles match that search.</p>
      )}
    </section>
  );
}
