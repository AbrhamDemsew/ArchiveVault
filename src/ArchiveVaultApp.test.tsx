import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArchiveVaultApp from './ArchiveVaultApp';
import { __resetArchiveStoreForTests } from './hooks/useArchiveStore';

describe('ArchiveVaultApp', () => {
  beforeEach(() => {
    window.localStorage.clear();
    __resetArchiveStoreForTests();
  });

  it('opens the artifacts workspace from the sidebar', async () => {
    const user = userEvent.setup();
    render(<ArchiveVaultApp />);
    expect(screen.getByText(/Gallery-to-collection museum operations/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^artifacts/i }));
    expect(await screen.findByLabelText('Search collection')).toBeInTheDocument();
  });

  it('opens help without ambiguous controls', async () => {
    const user = userEvent.setup();
    render(<ArchiveVaultApp />);
    await user.click(screen.getByRole('button', { name: /^help/i }));
    expect(screen.getByLabelText('Search procedures')).toBeInTheDocument();
  });
});
