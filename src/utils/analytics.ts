import type { Gallery, Exhibit, Loan, Artifact, ArtifactStatus } from '../types/archive';

export interface StatusCount {
  status: ArtifactStatus;
  count: number;
}

export function countByStatus(artifacts: Artifact[]): StatusCount[] {
  const counts: Record<ArtifactStatus, number> = {
    draft: 0,
    cataloging: 0,
    on_loan: 0,
    displayed: 0,
    deaccessioned: 0,
  };
  for (const item of artifacts) {
    counts[item.status] += 1;
  }
  return (Object.keys(counts) as ArtifactStatus[]).map((status) => ({
    status,
    count: counts[status],
  }));
}

export function utilizationRate(artifacts: Artifact[]): number {
  if (artifacts.length === 0) return 0;
  const working = artifacts.filter((item) => item.status === 'draft' || item.status === 'cataloging').length;
  return Math.round((working / artifacts.length) * 100);
}

export function averageLoad(exhibits: Exhibit[]): number {
  const live = exhibits.filter((exhibit) => exhibit.status !== 'spiked');
  if (live.length === 0) return 0;
  return Math.round(live.reduce((sum, exhibit) => sum + exhibit.loadPercent, 0) / live.length);
}

export function loanBacklog(records: Loan[]): number {
  return records.filter(
    (record) => record.status === 'queued' || record.status === 'overdue' || record.status === 'assigned',
  ).length;
}

export function loanCost(records: Loan[]): number {
  return records.reduce((sum, record) => sum + record.cost, 0);
}

export function gallerySummary(galleries: Gallery[], artifacts: Artifact[]) {
  return galleries.map((gallery) => {
    const assigned = artifacts.filter((item) => item.galleryId === gallery.id);
    return {
      gallery,
      assigned: assigned.length,
      idle: assigned.filter((item) => item.status === 'displayed').length,
      inShop: assigned.filter((item) => item.status === 'on_loan').length,
    };
  });
}

export function delayedExhibitCount(exhibits: Exhibit[]): number {
  return exhibits.filter((exhibit) => exhibit.status === 'delayed').length;
}
