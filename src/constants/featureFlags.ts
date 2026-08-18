export interface FeatureFlag {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlag[] = [
  {
    key: 'bulk-assign',
    label: 'Bulk gallery assign',
    description: 'Allow registrars to move several draft artifacts onto a gallery at once.',
    enabled: true,
  },
  {
    key: 'odometer-alerts',
    label: 'Case depth alerts',
    description: 'Highlight artifacts that are within 8 inches of a case limit.',
    enabled: true,
  },
  {
    key: 'electric-priority',
    label: 'Ceramics first',
    description: 'Prefer ceramic pieces for overflow when a gallery is near capacity.',
    enabled: false,
  },
  {
    key: 'night-dispatch',
    label: 'Night rotation lane',
    description: 'Keep the overnight rotation lane visible on the archive board.',
    enabled: true,
  },
];

export const UI_COPY = {
  appName: 'ArchiveVault',
  tagline: 'Gallery-to-collection museum operations',
  emptyArtifacts: 'No artifacts match the current collection filters.',
  emptyExhibits: 'No exhibits match the current slot filters.',
  emptyLoans: 'No loans match the current filters.',
  selectionStatus: (count: number) =>
    count === 0 ? 'No artifacts selected' : `${count} artifact${count === 1 ? '' : 's'} selected`,
};
