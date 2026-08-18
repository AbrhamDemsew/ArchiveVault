import type { Gallery } from '../../types/archive';
import { LOAN_STATUS_LABELS, LOAN_STATUSES, LOAN_TYPE_LABELS, LOAN_TYPES } from '../../types/archive';
import type { LoanFilters } from '../../types/filters';

interface LoanFilterBarProps {
  filters: LoanFilters;
  galleries: Gallery[];
  onChange: (filters: LoanFilters) => void;
  onReset: () => void;
}

export function LoanFilterBar({ filters, galleries, onChange, onReset }: LoanFilterBarProps) {
  return (
    <form className="filter-bar" aria-label="Loan filters" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="lon-query">Search haul-outs</label>
        <input id="lon-query" type="search" value={filters.query} onChange={(event) => onChange({ ...filters, query: event.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="lon-type">Type</label>
        <select id="lon-type" value={filters.type} onChange={(event) => onChange({ ...filters, type: event.target.value as LoanFilters['type'] })}>
          <option value="all">All types</option>
          {LOAN_TYPES.map((type) => (<option key={type} value={type}>{LOAN_TYPE_LABELS[type]}</option>))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="lon-status">Status</label>
        <select id="lon-status" value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value as LoanFilters['status'] })}>
          <option value="all">All statuses</option>
          {LOAN_STATUSES.map((status) => (<option key={status} value={status}>{LOAN_STATUS_LABELS[status]}</option>))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="lon-gallery">Gallery</label>
        <select id="lon-gallery" value={filters.galleryId} onChange={(event) => onChange({ ...filters, galleryId: event.target.value })}>
          <option value="all">All galleries</option>
          {galleries.map((gallery) => (<option key={gallery.id} value={gallery.id}>{gallery.name}</option>))}
        </select>
      </div>
      <button type="button" className="button ghost" onClick={onReset}>Clear filters</button>
    </form>
  );
}
