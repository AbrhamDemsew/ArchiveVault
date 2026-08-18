import { useMemo, useState } from 'react';
import { ExhibitFilterBar } from '../components/exhibits/ExhibitFilters';
import { ExhibitForm } from '../components/exhibits/ExhibitForm';
import { ExhibitTable } from '../components/exhibits/ExhibitTable';
import { UI_COPY } from '../constants/featureFlags';
import { useArchiveStore } from '../hooks/useArchiveStore';
import { DEFAULT_EXHIBIT_FILTERS, type ExhibitFilters } from '../types/filters';
import type { Exhibit } from '../types/archive';
import { filterExhibits } from '../utils/exhibitFilters';

export function ExhibitsPage() {
  const { exhibits, artifacts, galleries, addExhibit, updateExhibit, deleteExhibit } = useArchiveStore();
  const [filters, setFilters] = useState<ExhibitFilters>(DEFAULT_EXHIBIT_FILTERS);
  const [editing, setEditing] = useState<Exhibit | null>(null);
  const [showForm, setShowForm] = useState(false);
  const visible = useMemo(() => filterExhibits(exhibits, filters), [exhibits, filters]);

  return (
    <section className="page">
      <div className="page-toolbar">
        <p className="muted">{visible.length} of {exhibits.length} exhibits in view</p>
        <button type="button" className="button" onClick={() => { setEditing(null); setShowForm(true); }}>Add exhibit</button>
      </div>
      <ExhibitFilterBar filters={filters} galleries={galleries} onChange={setFilters} onReset={() => setFilters(DEFAULT_EXHIBIT_FILTERS)} />
      {showForm ? (
        <ExhibitForm
          galleries={galleries}
          artifacts={artifacts}
          initial={editing}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          onSubmit={(value) => {
            if (value.id) updateExhibit(value.id, value);
            else {
              addExhibit({
                name: value.name, artifactId: value.artifactId, galleryId: value.galleryId, origin: value.origin,
                destination: value.destination, date: value.date, startTime: value.startTime, endTime: value.endTime,
                status: value.status, durationMin: value.durationMin, loadPercent: value.loadPercent, notes: value.notes,
              });
            }
            setShowForm(false);
            setEditing(null);
          }}
        />
      ) : null}
      {visible.length === 0 ? (
        <p className="empty">{UI_COPY.emptyExhibits}</p>
      ) : (
        <ExhibitTable
          exhibits={visible}
          artifacts={artifacts}
          galleries={galleries}
          onEdit={(exhibit) => { setEditing(exhibit); setShowForm(true); }}
          onDelete={deleteExhibit}
        />
      )}
    </section>
  );
}
