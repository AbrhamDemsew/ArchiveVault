import type { Gallery } from '../../types/archive';
import { EXHIBIT_STATUS_LABELS, EXHIBIT_STATUSES } from '../../types/archive';
import type { ExhibitFilters } from '../../types/filters';

interface ExhibitFilterBarProps {
  filters: ExhibitFilters;
  galleries: Gallery[];
  onChange: (filters: ExhibitFilters) => void;
  onReset: () => void;
}

export function ExhibitFilterBar({ filters, galleries, onChange, onReset }: ExhibitFilterBarProps) {
  return (
    <form className="filter-bar" aria-label="Exhibit filters" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="exb-query">Search exhibits</label>
        <input id="exb-query" type="search" value={filters.query} onChange={(event) => onChange({ ...filters, query: event.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="exb-status">Status</label>
        <select id="exb-status" value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value as ExhibitFilters['status'] })}>
          <option value="all">All statuses</option>
          {EXHIBIT_STATUSES.map((status) => (
            <option key={status} value={status}>{EXHIBIT_STATUS_LABELS[status]}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="exb-gallery">Gallery</label>
        <select id="exb-gallery" value={filters.galleryId} onChange={(event) => onChange({ ...filters, galleryId: event.target.value })}>
          <option value="all">All galleries</option>
          {galleries.map((gallery) => (
            <option key={gallery.id} value={gallery.id}>{gallery.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="exb-from">From date</label>
        <input id="exb-from" type="date" value={filters.dateFrom} onChange={(event) => onChange({ ...filters, dateFrom: event.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="exb-to">To date</label>
        <input id="exb-to" type="date" value={filters.dateTo} onChange={(event) => onChange({ ...filters, dateTo: event.target.value })} />
      </div>
      <button type="button" className="button ghost" onClick={onReset}>Clear filters</button>
    </form>
  );
}
