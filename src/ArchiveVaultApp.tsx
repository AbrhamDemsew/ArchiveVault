import { AppProvider, useAppContext } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { ExhibitsPage } from './pages/ExhibitsPage';
import { LoansPage } from './pages/LoansPage';
import { HelpPage } from './pages/HelpPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ArtifactsPage } from './pages/ArtifactsPage';

function AppView() {
  const { view, denseTables } = useAppContext();
  return (
    <div className={denseTables ? 'is-dense' : undefined}>
      <AppShell>
        {view === 'dashboard' ? <DashboardPage /> : null}
        {view === 'artifacts' ? <ArtifactsPage /> : null}
        {view === 'exhibits' ? <ExhibitsPage /> : null}
        {view === 'loans' ? <LoansPage /> : null}
        {view === 'reports' ? <ReportsPage /> : null}
        {view === 'settings' ? <SettingsPage /> : null}
        {view === 'help' ? <HelpPage /> : null}
      </AppShell>
    </div>
  );
}

export default function ArchiveVaultApp() {
  return (
    <AppProvider>
      <AppView />
    </AppProvider>
  );
}
