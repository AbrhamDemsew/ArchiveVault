import type { ExhibitFilters } from '../types/filters';
import type { Exhibit } from '../types/archive';
import { compareStrings, matchesQuery } from './format';

export function exhibitSearchBlob(exhibit: Exhibit): string {
  return [exhibit.name, exhibit.origin, exhibit.destination, exhibit.notes].join(' ');
}

export function filterExhibits(exhibits: Exhibit[], filters: ExhibitFilters): Exhibit[] {
  const filtered = exhibits.filter((exhibit) => {
    if (!matchesQuery(exhibitSearchBlob(exhibit), filters.query)) return false;
    if (filters.status !== 'all' && exhibit.status !== filters.status) return false;
    if (filters.galleryId !== 'all' && exhibit.galleryId !== filters.galleryId) return false;
    if (filters.dateFrom && exhibit.date < filters.dateFrom) return false;
    if (filters.dateTo && exhibit.date > filters.dateTo) return false;
    return true;
  });

  const direction = filters.sortDirection === 'asc' ? 1 : -1;
  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'durationMin':
        return (a.durationMin - b.durationMin) * direction;
      case 'name':
        return compareStrings(a.name, b.name) * direction;
      default:
        return compareStrings(a.date + a.startTime, b.date + b.startTime) * direction;
    }
  });
}
