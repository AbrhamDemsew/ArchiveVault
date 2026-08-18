import { ROLE_LABELS, STATUS_LABELS, type ArtifactRole, type ArtifactStatus } from '../types/archive';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat('en-US');

export function formatCurrency(value: number): string {
  return currency.format(value);
}

export function formatNumber(value: number): string {
  return number.format(value);
}

export function formatFeet(value: number): string {
  return `${number.format(value)} ft`;
}

export function formatValue(value: number): string {
  return formatCurrency(value);
}

export function formatRole(role: ArtifactRole): string {
  return ROLE_LABELS[role];
}

export function formatStatus(status: ArtifactStatus): string {
  return STATUS_LABELS[status];
}

export function formatIsoDate(iso: string): string {
  if (!iso) return '—';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(value: string): string {
  if (!value) return '—';
  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function matchesQuery(haystack: string, query: string): boolean {
  if (!query.trim()) return true;
  return haystack.toLowerCase().includes(query.trim().toLowerCase());
}

export function compareStrings(a: string, b: string): number {
  return a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' });
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
