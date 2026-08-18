import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ArchiveVaultApp from './ArchiveVaultApp';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArchiveVaultApp />
  </StrictMode>,
);
