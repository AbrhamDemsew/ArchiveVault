import {
  MEDIUM_LABELS,
  MEDIUM_TYPES,
  ROLE_LABELS,
  STATUS_LABELS,
  ARTIFACT_ROLES,
  ARTIFACT_STATUSES,
  type Gallery,
} from '../../types/archive';
import type { ArtifactFilters } from '../../types/filters';

interface ArtifactFiltersProps {
  filters: ArtifactFilters;
  galleries: Gallery[];
  onChange: (filters: ArtifactFilters) => void;
  onReset: () => void;
}

export function ArtifactFilterBar({ filters, galleries, onChange, onReset }: ArtifactFiltersProps) {
  return (
    <form className="filter-bar" aria-label="Artifact filters" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="artifact-query">Search collection</label>
        <input
          id="artifact-query"
          type="search"
          value={filters.query}
          placeholder="SKU, curator, beat, or notes"
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="artifact-role">Class</label>
        <select
          id="artifact-role"
          value={filters.role}
          onChange={(event) => onChange({ ...filters, role: event.target.value as ArtifactFilters['role'] })}
        >
          <option value="all">All classes</option>
          {ARTIFACT_ROLES.map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="artifact-status">Status</label>
        <select
          id="artifact-status"
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value as ArtifactFilters['status'] })}
        >
          <option value="all">All statuses</option>
          {ARTIFACT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="artifact-gallery">Gallery</label>
        <select
          id="artifact-gallery"
          value={filters.galleryId}
          onChange={(event) => onChange({ ...filters, galleryId: event.target.value })}
        >
          <option value="all">All galleries</option>
          {galleries.map((gallery) => (
            <option key={gallery.id} value={gallery.id}>
              {gallery.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="artifact-hull">Hull</label>
        <select
          id="artifact-hull"
          value={filters.format}
          onChange={(event) => onChange({ ...filters, format: event.target.value as ArtifactFilters['format'] })}
        >
          <option value="all">All formats</option>
          {MEDIUM_TYPES.map((type) => (
            <option key={type} value={type}>
              {MEDIUM_LABELS[type]}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="artifact-sort">Sort</label>
        <select
          id="artifact-sort"
          value={`${filters.sortBy}:${filters.sortDirection}`}
          onChange={(event) => {
            const [sortBy, sortDirection] = event.target.value.split(':') as [
              ArtifactFilters['sortBy'],
              ArtifactFilters['sortDirection'],
            ];
            onChange({ ...filters, sortBy, sortDirection });
          }}
        >
          <option value="sku:asc">SKU</option>
          <option value="curator:asc">Curator A–Z</option>
          <option value="columnInches:desc">Highest inches</option>
          <option value="wordCount:desc">Highest word count</option>
        </select>
      </div>
      <button type="button" className="button ghost" onClick={onReset}>
        Clear filters
      </button>
    </form>
  );
}
