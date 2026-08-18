export const ARTIFACT_ROLES = ['ceramic', 'painting', 'sculpture', 'textile', 'coin'] as const;
export type ArtifactRole = (typeof ARTIFACT_ROLES)[number];

export const ARTIFACT_STATUSES = ['draft', 'cataloging', 'on_loan', 'displayed', 'deaccessioned'] as const;
export type ArtifactStatus = (typeof ARTIFACT_STATUSES)[number];

export const MEDIUM_TYPES = ['print', 'web', 'broadcast', 'newsletter', 'podcast'] as const;
export type ArtifactFormat = (typeof MEDIUM_TYPES)[number];

export const EXHIBIT_STATUSES = ['scheduled', 'layout', 'shipped', 'delayed', 'spiked'] as const;
export type ExhibitStatus = (typeof EXHIBIT_STATUSES)[number];

export const LOAN_TYPES = ['conservation', 'research', 'insurance', 'digitization', 'travel'] as const;
export type LoanType = (typeof LOAN_TYPES)[number];

export const LOAN_STATUSES = ['queued', 'assigned', 'returned', 'held', 'overdue'] as const;
export type LoanStatus = (typeof LOAN_STATUSES)[number];

export const ROLE_LABELS: Record<ArtifactRole, string> = {
  ceramic: 'Ceramic',
  painting: 'Painting',
  sculpture: 'Sculpture',
  textile: 'Textile',
  coin: 'Coin',
};

export const STATUS_LABELS: Record<ArtifactStatus, string> = {
  draft: 'Draft',
  cataloging: 'Cataloging',
  on_loan: 'On loan',
  displayed: 'Displayed',
  deaccessioned: 'Deaccessioned',
};

export const MEDIUM_LABELS: Record<ArtifactFormat, string> = {
  print: 'Print',
  web: 'Web',
  broadcast: 'Broadcast',
  newsletter: 'Newsletter',
  podcast: 'Podcast',
};

export const EXHIBIT_STATUS_LABELS: Record<ExhibitStatus, string> = {
  scheduled: 'Scheduled',
  layout: 'Layout',
  shipped: 'Shipped',
  delayed: 'Delayed',
  spiked: 'Spiked',
};

export const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  conservation: 'Conservation',
  research: 'Research',
  insurance: 'Insurance',
  digitization: 'Digitization',
  travel: 'Travel',
};

export const LOAN_STATUS_LABELS: Record<LoanStatus, string> = {
  queued: 'Queued',
  assigned: 'Assigned',
  returned: 'Returned',
  held: 'Held',
  overdue: 'Overdue',
};

export interface Gallery {
  id: string;
  name: string;
  code: string;
  city: string;
  region: string;
  address: string;
  capacity: number;
  managerName: string;
  phone: string;
  description: string;
}

export interface Artifact {
  id: string;
  sku: string;
  slug: string;
  beat: string;
  headline: string;
  wordCount: number;
  role: ArtifactRole;
  status: ArtifactStatus;
  format: ArtifactFormat;
  galleryId: string;
  sectionCode: string;
  columnInches: number;
  dayRate: number;
  curator: string;
  email: string;
  filedAt: string;
  notes: string;
  tags: string[];
}

export interface Exhibit {
  id: string;
  artifactId: string;
  galleryId: string;
  name: string;
  origin: string;
  destination: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ExhibitStatus;
  durationMin: number;
  loadPercent: number;
  notes: string;
}

export interface Loan {
  id: string;
  artifactId: string;
  galleryId: string;
  type: LoanType;
  status: LoanStatus;
  startDate: string;
  endDate: string;
  editor: string;
  cost: number;
  notes: string;
}

export interface ArchiveDocument {
  id: string;
  title: string;
  category: string;
  updatedAt: string;
  summary: string;
  body: string;
}

export type AppView =
  | 'dashboard'
  | 'artifacts'
  | 'exhibits'
  | 'loans'
  | 'reports'
  | 'settings'
  | 'help';
