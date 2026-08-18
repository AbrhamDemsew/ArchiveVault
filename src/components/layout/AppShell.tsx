import { type ReactNode } from 'react';
import { NAV_ITEMS } from '../../constants/navigation';
import { UI_COPY } from '../../constants/featureFlags';
import { useAppContext } from '../../context/AppContext';
import type { AppView } from '../../types/archive';

export function AppShell({ children }: { children: ReactNode }) {
  const { view, setView } = useAppContext();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="brand-name">{UI_COPY.appName}</p>
            <p className="brand-tag">{UI_COPY.tagline}</p>
          </div>
        </div>
        <nav>
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.view}>
                <button
                  type="button"
                  className={view === item.view ? 'nav-button is-active' : 'nav-button'}
                  aria-current={view === item.view ? 'page' : undefined}
                  onClick={() => setView(item.view as AppView)}
                >
                  <span>{item.label}</span>
                  <span className="nav-description">{item.description}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <p className="topbar-kicker">Archive operations</p>
          <h1>{NAV_ITEMS.find((item) => item.view === view)?.label}</h1>
        </header>
        <main id="main-content" className="main-content">{children}</main>
      </div>
    </div>
  );
}
