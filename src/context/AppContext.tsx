import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AppView } from '../types/archive';

interface AppContextValue {
  view: AppView;
  setView: (view: AppView) => void;
  denseTables: boolean;
  setDenseTables: (value: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useLocalStorage<AppView>('archivevault.view', 'dashboard');
  const [denseTables, setDenseTables] = useLocalStorage('archivevault.dense', false);

  return (
    <AppContext.Provider value={{ view, setView, denseTables, setDenseTables }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useAppContext must be used within AppProvider');
  return value;
}
