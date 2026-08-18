import { useMemo, useState } from 'react';
import { useArchiveStore } from '../hooks/useArchiveStore';
import { gallerySummary, loanCost, utilizationRate } from '../utils/analytics';
import { availableDailyValue, totalDailyValue } from '../utils/capacity';
import { formatCurrency, formatNumber, formatValue } from '../utils/format';
import { artifactsDueSoon } from '../utils/schedule';

export function ReportsPage() {
  const { artifacts, galleries, loans } = useArchiveStore();
  const [feet, setFeet] = useState(8);
  const due = useMemo(() => artifactsDueSoon(artifacts, feet), [artifacts, feet]);
  const summary = useMemo(() => gallerySummary(galleries, artifacts), [galleries, artifacts]);

  return (
    <section className="page">
      <div className="stat-grid">
        <article className="stat-card">
          <h2>Archive day rate</h2>
          <p className="stat-value">{formatValue(totalDailyValue(artifacts))}</p>
        </article>
        <article className="stat-card">
          <h2>Draft / editing</h2>
          <p className="stat-value">{formatValue(availableDailyValue(artifacts))}</p>
        </article>
        <article className="stat-card">
          <h2>Freelance spend</h2>
          <p className="stat-value">{formatCurrency(loanCost(loans))}</p>
        </article>
        <article className="stat-card">
          <h2>Utilization</h2>
          <p className="stat-value">{utilizationRate(artifacts)}%</p>
        </article>
      </div>
      <article className="panel">
        <div className="panel-head">
          <h2>LOA window</h2>
          <div className="field">
            <label htmlFor="due-feet">Due within (feet)</label>
            <input id="due-feet" type="number" min={1} max={30} value={feet} onChange={(event) => setFeet(Number(event.target.value))} />
          </div>
        </div>
        <p className="muted">{due.length} artifacts are within {formatNumber(feet)} inches of a rotation cycle.</p>
        <ul className="plain-list">
          {due.slice(0, 12).map((item) => (
            <li key={item.id}>{item.sku} · {item.curator} · {formatNumber(item.columnInches)} ft</li>
          ))}
        </ul>
      </article>
      <article className="panel">
        <h2>Gallery assignment</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Gallery</th>
              <th scope="col">Assigned</th>
              <th scope="col">Published</th>
              <th scope="col">Loan</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((row) => (
              <tr key={row.gallery.id}>
                <td>{row.gallery.name}</td>
                <td>{row.assigned}</td>
                <td>{row.idle}</td>
                <td>{row.inShop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
