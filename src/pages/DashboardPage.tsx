import { useMemo, useState } from 'react';
import { caseloadPercent } from '../utils/capacity';
import { averageLoad, countByStatus, delayedExhibitCount, loanBacklog, utilizationRate } from '../utils/analytics';
import { STATUS_LABELS } from '../types/archive';
import { useArchiveStore } from '../hooks/useArchiveStore';
import { formatNumber } from '../utils/format';

export function DashboardPage() {
  const { artifacts, galleries, exhibits, loans } = useArchiveStore();
  const [query, setQuery] = useState('');
  const statusCounts = useMemo(() => countByStatus(artifacts), [artifacts]);
  const galleriesInView = useMemo(
    () => galleries.filter((gallery) => gallery.name.toLowerCase().includes(query.toLowerCase())),
    [galleries, query],
  );

  return (
    <section className="page">
      <div className="stat-grid">
        <article className="stat-card">
          <h2>Utilization</h2>
          <p className="stat-value">{utilizationRate(artifacts)}%</p>
          <p className="muted">Draft and editing copy versus the whole book.</p>
        </article>
        <article className="stat-card">
          <h2>Average arrival load</h2>
          <p className="stat-value">{averageLoad(exhibits)}%</p>
          <p className="muted">Mean slot load across non-spiked exhibits.</p>
        </article>
        <article className="stat-card">
          <h2>Loan backlog</h2>
          <p className="stat-value">{formatNumber(loanBacklog(loans))}</p>
          <p className="muted">Queued, overdue, or assigned editor work.</p>
        </article>
        <article className="stat-card">
          <h2>Delayed exhibits</h2>
          <p className="stat-value">{delayedExhibitCount(exhibits)}</p>
          <p className="muted">Arrivals currently marked delayed on the board.</p>
        </article>
      </div>
      <div className="split">
        <article className="panel">
          <h2>Status mix</h2>
          <ul className="status-list">
            {statusCounts.map((row) => (
              <li key={row.status}>
                <span>{STATUS_LABELS[row.status]}</span>
                <strong>{row.count}</strong>
              </li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <div className="panel-head">
            <h2>Gallery load</h2>
            <div className="field">
              <label htmlFor="gal-search">Find gallery</label>
              <input id="gal-search" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
          </div>
          <ul className="occupancy-list">
            {galleriesInView.map((gallery) => {
              const percent = caseloadPercent(gallery, artifacts);
              return (
                <li key={gallery.id}>
                  <div>
                    <strong>{gallery.name}</strong>
                    <p className="muted">{gallery.city} · {gallery.code}</p>
                  </div>
                  <div className="meter" aria-label={`${gallery.name} occupancy ${percent} percent`}>
                    <span style={{ width: `${percent}%` }} />
                  </div>
                  <span>{percent}%</span>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}
