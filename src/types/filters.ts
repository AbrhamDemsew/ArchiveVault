import type { ExhibitStatus, LoanStatus, LoanType, ArtifactFormat, ArtifactRole, ArtifactStatus } from './archive';

export type SortDirection = 'asc' | 'desc';

export interface ArtifactFilters {
  query: string;
  role: ArtifactRole | 'all';
  status: ArtifactStatus | 'all';
  galleryId: string | 'all';
  format: ArtifactFormat | 'all';
  sortBy: 'sku' | 'columnInches' | 'wordCount' | 'curator';
  sortDirection: SortDirection;
}

export interface ExhibitFilters {
  query: string;
  status: ExhibitStatus | 'all';
  galleryId: string | 'all';
  dateFrom: string;
  dateTo: string;
  sortBy: 'date' | 'durationMin' | 'name';
  sortDirection: SortDirection;
}

export interface LoanFilters {
  query: string;
  type: LoanType | 'all';
  status: LoanStatus | 'all';
  galleryId: string | 'all';
  sortBy: 'startDate' | 'cost' | 'type';
  sortDirection: SortDirection;
}

export const DEFAULT_ARTIFACT_FILTERS: ArtifactFilters = {
  query: '',
  role: 'all',
  status: 'all',
  galleryId: 'all',
  format: 'all',
  sortBy: 'sku',
  sortDirection: 'asc',
};

export const DEFAULT_EXHIBIT_FILTERS: ExhibitFilters = {
  query: '',
  status: 'all',
  galleryId: 'all',
  dateFrom: '',
  dateTo: '',
  sortBy: 'date',
  sortDirection: 'asc',
};

export const DEFAULT_LOAN_FILTERS: LoanFilters = {
  query: '',
  type: 'all',
  status: 'all',
  galleryId: 'all',
  sortBy: 'startDate',
  sortDirection: 'asc',
};
