import { ROLE_LABELS, STATUS_LABELS } from '../types/archive';
import {
  compareStrings,
  formatRole,
  formatCurrency,
  formatIsoDate,
  formatFeet,
  formatNumber,
  formatStatus,
  formatTime,
  formatValue,
  initials,
  matchesQuery,
} from './format';

describe('format', () => {
  it('formats currency without cents', () => {
    expect(formatCurrency(1200)).toBe('$1,200');
  });

  it('formats numbers and feet', () => {
    expect(formatNumber(12890)).toBe('12,890');
    expect(formatFeet(12890)).toBe('12,890 ft');
  });

  it('formats daily rate as currency', () => {
    expect(formatValue(1800)).toBe('$1,800');
  });

  it('maps class and status labels', () => {
    expect(formatRole('ceramic')).toBe(ROLE_LABELS.ceramic);
    expect(formatStatus('cataloging')).toBe(STATUS_LABELS.cataloging);
  });

  it('formats dates and times', () => {
    expect(formatIsoDate('2026-06-03')).toMatch(/Jun/);
    expect(formatTime('14:30')).toBe('2:30 PM');
    expect(formatTime('00:05')).toBe('12:05 AM');
    expect(formatIsoDate('')).toBe('—');
  });

  it('matches queries case-insensitively', () => {
    expect(matchesQuery('Rotunda Gallery', 'rotunda')).toBe(true);
    expect(matchesQuery('Rotunda Gallery', '  ROTUNDA ')).toBe(true);
    expect(matchesQuery('Metro Gallery', 'dallas')).toBe(false);
    expect(matchesQuery('Metro Gallery', '')).toBe(true);
  });

  it('compares strings numerically', () => {
    expect(compareStrings('AV-2', 'AV-10')).toBeLessThan(0);
  });

  it('builds initials', () => {
    expect(initials('Nora Vale')).toBe('NV');
  });
});
