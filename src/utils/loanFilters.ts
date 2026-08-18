import type { LoanFilters } from '../types/filters';
import type { Loan } from '../types/archive';
import { compareStrings, matchesQuery } from './format';

export function loanSearchBlob(record: Loan): string {
  return [record.editor, record.notes, record.type].join(' ');
}

export function filterLoans(records: Loan[], filters: LoanFilters): Loan[] {
  const filtered = records.filter((record) => {
    if (!matchesQuery(loanSearchBlob(record), filters.query)) return false;
    if (filters.type !== 'all' && record.type !== filters.type) return false;
    if (filters.status !== 'all' && record.status !== filters.status) return false;
    if (filters.galleryId !== 'all' && record.galleryId !== filters.galleryId) return false;
    return true;
  });

  const direction = filters.sortDirection === 'asc' ? 1 : -1;
  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'cost':
        return (a.cost - b.cost) * direction;
      case 'type':
        return compareStrings(a.type, b.type) * direction;
      default:
        return compareStrings(a.startDate, b.startDate) * direction;
    }
  });
}
