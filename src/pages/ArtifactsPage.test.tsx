import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../context/AppContext';
import { seedArtifacts } from '../data/seedArtifacts';
import { __resetArchiveStoreForTests } from '../hooks/useArchiveStore';
import { ArtifactsPage } from '../pages/ArtifactsPage';

function renderArtifacts() {
  __resetArchiveStoreForTests();
  return render(
    <AppProvider>
      <ArtifactsPage />
    </AppProvider>,
  );
}

describe('ArtifactsPage', () => {
  it('renders the roster with labeled search and status text', () => {
    renderArtifacts();
    expect(screen.getByLabelText('Search collection')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('No artifacts selected');
    expect(screen.getByLabelText(`Select ${seedArtifacts[0].sku}`)).toBeInTheDocument();
  });

  it('filters the table by search query', () => {
    renderArtifacts();
    fireEvent.change(screen.getByLabelText('Search collection'), {
      target: { value: seedArtifacts[0].sku },
    });
    expect(screen.getByLabelText(`Select ${seedArtifacts[0].sku}`)).toBeInTheDocument();
    expect(screen.queryByLabelText(`Select ${seedArtifacts[1].sku}`)).not.toBeInTheDocument();
  });

  it('lets a clerk select a visible row', async () => {
    const user = userEvent.setup();
    renderArtifacts();
    await user.click(screen.getByLabelText(`Select ${seedArtifacts[0].sku}`));
    expect(screen.getByRole('status')).toHaveTextContent('1 artifact selected');
  });
});
