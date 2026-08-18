import type { ArtifactFilters } from '../types/filters';
import type { Artifact } from '../types/archive';
import { compareStrings, matchesQuery } from './format';

export function artifactSearchBlob(item: Artifact): string {
  return [
    item.sku,
    item.slug,
    item.beat,
    item.headline,
    item.sectionCode,
    item.curator,
    item.email,
    item.notes,
    item.tags.join(' '),
  ].join(' ');
}

export function filterArtifacts(artifacts: Artifact[], filters: ArtifactFilters): Artifact[] {
  const filtered = artifacts.filter((item) => {
    if (!matchesQuery(artifactSearchBlob(item), filters.query)) return false;
    if (filters.role !== 'all' && item.role !== filters.role) return false;
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.galleryId !== 'all' && item.galleryId !== filters.galleryId) return false;
    if (filters.format !== 'all' && item.format !== filters.format) return false;
    return true;
  });

  const direction = filters.sortDirection === 'asc' ? 1 : -1;
  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'columnInches':
        return (a.columnInches - b.columnInches) * direction;
      case 'wordCount':
        return (a.wordCount - b.wordCount) * direction;
      case 'curator':
        return compareStrings(a.curator, b.curator) * direction;
      default:
        return compareStrings(a.sku, b.sku) * direction;
    }
  });
}
