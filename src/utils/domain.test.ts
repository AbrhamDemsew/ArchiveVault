import { remainingCapacity, caseloadPercent, totalDailyValue, availableDailyValue } from './capacity';
import { seedGalleries } from '../data/seedGalleries';
import { seedArtifacts } from '../data/seedArtifacts';
import { canDisplay, nextSku, curatorEmail, statusTone } from './artifactUtils';
import { minutesBetween, overlappingExhibits, artifactsDueSoon } from './schedule';
import { averageLoad, countByStatus, delayedExhibitCount, loanBacklog, utilizationRate } from './analytics';
import { seedExhibits } from '../data/seedExhibits';
import { seedLoans } from '../data/seedLoans';
import { DEFAULT_ARTIFACT_FILTERS } from '../types/filters';
import { filterArtifacts } from './artifactFilters';
import { filterExhibits } from './exhibitFilters';
import { filterLoans } from './loanFilters';

describe('capacity and artifact utils', () => {
  it('computes occupancy against gallery capacity', () => {
    const gallery = seedGalleries[0];
    const percent = caseloadPercent(gallery, seedArtifacts);
    expect(percent).toBeGreaterThanOrEqual(0);
    expect(percent).toBeLessThanOrEqual(100);
    expect(remainingCapacity(gallery, seedArtifacts)).toBeGreaterThanOrEqual(0);
  });

  it('sums daily rate and berthed transient value', () => {
    expect(totalDailyValue(seedArtifacts)).toBeGreaterThan(0);
    expect(availableDailyValue(seedArtifacts)).toBeGreaterThanOrEqual(0);
  });

  it('creates the next SKU and curator email', () => {
    expect(nextSku(seedArtifacts)).toBe('AV-121');
    expect(curatorEmail('Nora Vale')).toBe('nora.vale@archivevault.local');
    expect(canDisplay(seedArtifacts.find((item) => item.status === 'draft')!)).toBe(true);
    expect(statusTone('deaccessioned')).toBe('danger');
  });
});

describe('schedule and analytics', () => {
  it('measures exhibit windows and overlaps', () => {
    expect(minutesBetween('06:00', '10:30')).toBe(270);
    const a = seedExhibits[0];
    const b = { ...a, id: 'other', startTime: a.startTime, endTime: a.endTime };
    expect(overlappingExhibits(a, b)).toBe(true);
  });

  it('summarizes archive health', () => {
    expect(countByStatus(seedArtifacts).reduce((sum, row) => sum + row.count, 0)).toBe(seedArtifacts.length);
    expect(utilizationRate(seedArtifacts)).toBeGreaterThanOrEqual(0);
    expect(averageLoad(seedExhibits)).toBeGreaterThan(0);
    expect(loanBacklog(seedLoans)).toBeGreaterThan(0);
    expect(delayedExhibitCount(seedExhibits)).toBeGreaterThan(0);
    expect(artifactsDueSoon(seedArtifacts, 8).length).toBeGreaterThanOrEqual(0);
  });
});

describe('default filters', () => {
  it('returns the full roster with default artifact filters', () => {
    expect(filterArtifacts(seedArtifacts, DEFAULT_ARTIFACT_FILTERS)).toHaveLength(seedArtifacts.length);
  });

  it('narrows exhibits and haul-outs with status filters', () => {
    expect(
      filterExhibits(seedExhibits, {
        query: '',
        status: 'delayed',
        galleryId: 'all',
        dateFrom: '',
        dateTo: '',
        sortBy: 'date',
        sortDirection: 'asc',
      }).every((exhibit) => exhibit.status === 'delayed'),
    ).toBe(true);

    expect(
      filterLoans(seedLoans, {
        query: '',
        type: 'all',
        status: 'overdue',
        galleryId: 'all',
        sortBy: 'startDate',
        sortDirection: 'asc',
      }).every((record) => record.status === 'overdue'),
    ).toBe(true);
  });
});
