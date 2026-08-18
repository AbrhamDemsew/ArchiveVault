import type { AppView } from '../types/archive';

export interface NavItem {
  view: AppView;
  label: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    view: 'dashboard',
    label: 'Archive board',
    description: 'Live snapshot of gallery load, exhibit slots, and loan backlog.',
  },
  {
    view: 'artifacts',
    label: 'Artifacts',
    description: 'Collection roster of artifacts assigned to each gallery.',
  },
  {
    view: 'exhibits',
    label: 'Exhibits',
    description: 'Rotation slots with layout and delay status.',
  },
  {
    view: 'loans',
    label: 'Loans',
    description: 'Conservation requests, provenance checks, and overdue registrar follow-ups.',
  },
  {
    view: 'reports',
    label: 'Reports',
    description: 'Utilization, medium mix, and insurance-value summaries for the current collection.',
  },
  {
    view: 'settings',
    label: 'Settings',
    description: 'Gallery defaults, feature flags, and registrar preferences.',
  },
  {
    view: 'help',
    label: 'Help',
    description: 'Operating procedures and policy library for registrars.',
  },
];
