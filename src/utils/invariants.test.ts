import { seedGalleries } from '../data/seedGalleries';
import { seedLoans } from '../data/seedLoans';
import { seedExhibits } from '../data/seedExhibits';
import { seedArtifacts } from '../data/seedArtifacts';
import { helpArticles } from '../content/helpArticles';
import { policyLibrary } from '../content/policyLibrary';
import { DEFAULT_LOAN_FILTERS, DEFAULT_EXHIBIT_FILTERS, DEFAULT_ARTIFACT_FILTERS } from '../types/filters';
import { caseloadPercent } from './capacity';
import { filterLoans } from './loanFilters';
import { filterExhibits } from './exhibitFilters';
import { filterArtifacts } from './artifactFilters';
import { matchesQuery } from './format';

describe('artifact filter invariants', () => {
  it.each(seedArtifacts.map((item) => [item.id, item.sku, item.galleryId]))(
    'keeps %s (%s) when filtering to its gallery',
    (id, _sku, galleryId) => {
      const rows = filterArtifacts(seedArtifacts, { ...DEFAULT_ARTIFACT_FILTERS, galleryId });
      expect(rows.some((item) => item.id === id)).toBe(true);
    },
  );

  it.each(seedArtifacts.map((item) => [item.id, item.status]))(
    'keeps %s when filtering to status %s',
    (id, status) => {
      const rows = filterArtifacts(seedArtifacts, { ...DEFAULT_ARTIFACT_FILTERS, status });
      expect(rows.some((item) => item.id === id)).toBe(true);
    },
  );

  it.each(seedArtifacts.map((item) => [item.id, item.role]))(
    'keeps %s when filtering to class %s',
    (id, role) => {
      const rows = filterArtifacts(seedArtifacts, { ...DEFAULT_ARTIFACT_FILTERS, role });
      expect(rows.some((item) => item.id === id)).toBe(true);
    },
  );

  it.each(seedArtifacts.map((item) => [item.sku]))(
    'finds %s by sku search',
    (sku) => {
      const rows = filterArtifacts(seedArtifacts, { ...DEFAULT_ARTIFACT_FILTERS, query: sku });
      expect(rows.some((item) => item.sku === sku)).toBe(true);
    },
  );
});

describe('exhibit filter invariants', () => {
  it.each(seedExhibits.map((exhibit) => [exhibit.id, exhibit.status]))(
    'keeps exhibit %s for status %s',
    (id, status) => {
      const rows = filterExhibits(seedExhibits, { ...DEFAULT_EXHIBIT_FILTERS, status });
      expect(rows.some((exhibit) => exhibit.id === id)).toBe(true);
    },
  );

  it.each(seedExhibits.map((exhibit) => [exhibit.id, exhibit.name]))(
    'finds exhibit %s by name',
    (id, name) => {
      const rows = filterExhibits(seedExhibits, { ...DEFAULT_EXHIBIT_FILTERS, query: name });
      expect(rows.some((exhibit) => exhibit.id === id)).toBe(true);
    },
  );
});

describe('loan filter invariants', () => {
  it.each(seedLoans.map((record) => [record.id, record.status]))(
    'keeps haul-out %s for status %s',
    (id, status) => {
      const rows = filterLoans(seedLoans, { ...DEFAULT_LOAN_FILTERS, status });
      expect(rows.some((record) => record.id === id)).toBe(true);
    },
  );
});

describe('catalog and content invariants', () => {
  it.each(seedGalleries.map((gallery) => [gallery.id, gallery.name]))(
    'computes occupancy for %s',
    (id) => {
      const gallery = seedGalleries.find((item) => item.id === id)!;
      const percent = caseloadPercent(gallery, seedArtifacts);
      expect(percent).toBeGreaterThanOrEqual(0);
      expect(percent).toBeLessThanOrEqual(100);
    },
  );

  it.each(helpArticles.map((article) => [article.id, article.title]))(
    'indexes help article %s',
    (_id, title) => {
      expect(matchesQuery(title, title.slice(0, 8))).toBe(true);
    },
  );

  it.each(policyLibrary.map((policy) => [policy.id, policy.title]))(
    'indexes policy %s',
    (_id, title) => {
      expect(title.length).toBeGreaterThan(8);
    },
  );
});
