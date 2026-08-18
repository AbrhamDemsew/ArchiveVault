import { useEffect, useMemo, useState } from 'react';
import { ArtifactFilterBar } from '../components/artifacts/ArtifactFilters';
import { ArtifactForm } from '../components/artifacts/ArtifactForm';
import { ArtifactTable } from '../components/artifacts/ArtifactTable';
import { UI_COPY } from '../constants/featureFlags';
import { useArchiveStore } from '../hooks/useArchiveStore';
import { useSelection } from '../hooks/useSelection';
import { DEFAULT_ARTIFACT_FILTERS, type ArtifactFilters } from '../types/filters';
import type { Artifact } from '../types/archive';
import { filterArtifacts } from '../utils/artifactFilters';

export function ArtifactsPage() {
  const { artifacts, galleries, addArtifact, updateArtifact, deleteArtifact } = useArchiveStore();
  const [filters, setFilters] = useState<ArtifactFilters>(DEFAULT_ARTIFACT_FILTERS);
  const [editing, setEditing] = useState<Artifact | null>(null);
  const [showForm, setShowForm] = useState(false);

  const visible = useMemo(() => filterArtifacts(artifacts, filters), [artifacts, filters]);
  const selection = useSelection(visible.map((item) => item.id));
  const { clear: clearSelection } = selection;

  useEffect(() => {
    clearSelection();
  }, [filters, clearSelection]);

  return (
    <section className="page">
      <div className="page-toolbar">
        <div>
          <p className="eyebrow">Archive</p>
          <p className="muted">
            {visible.length} of {artifacts.length} artifacts in view
          </p>
        </div>
        <button
          type="button"
          className="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Add artifact
        </button>
      </div>

      <ArtifactFilterBar
        filters={filters}
        galleries={galleries}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_ARTIFACT_FILTERS)}
      />

      <p className="selection-status" role="status" aria-live="polite">
        {UI_COPY.selectionStatus(selection.selectedIds.length)}
      </p>

      {showForm ? (
        <ArtifactForm
          galleries={galleries}
          initial={editing}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSubmit={(value) => {
            if (value.id) {
              updateArtifact(value.id, value);
            } else {
              addArtifact({
                slug: value.slug,
                beat: value.beat,
                headline: value.headline,
                wordCount: value.wordCount,
                role: value.role,
                status: value.status,
                format: value.format,
                galleryId: value.galleryId,
                sectionCode: value.sectionCode,
                columnInches: value.columnInches,
                dayRate: value.dayRate,
                curator: value.curator,
                email: value.email,
                filedAt: value.filedAt,
                notes: value.notes,
                tags: value.tags,
              });
            }
            setShowForm(false);
            setEditing(null);
          }}
        />
      ) : null}

      {visible.length === 0 ? (
        <p className="empty">{UI_COPY.emptyArtifacts}</p>
      ) : (
        <ArtifactTable
          artifacts={visible}
          galleries={galleries}
          selectedIds={selection.selectedIds}
          allVisibleSelected={selection.allVisibleSelected}
          someVisibleSelected={selection.someVisibleSelected}
          onToggle={selection.toggle}
          onToggleAll={selection.toggleAllVisible}
          onEdit={(item) => {
            setEditing(item);
            setShowForm(true);
          }}
          onDelete={deleteArtifact}
        />
      )}
    </section>
  );
}
