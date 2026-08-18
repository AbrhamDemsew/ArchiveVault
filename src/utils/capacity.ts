import type { Gallery, Artifact } from '../types/archive';

export function galleryLoad(gallery: Gallery, artifacts: Artifact[]): number {
  return artifacts.filter((item) => item.galleryId === gallery.id && item.status !== 'deaccessioned').length;
}

export function caseloadPercent(gallery: Gallery, artifacts: Artifact[]): number {
  if (gallery.capacity <= 0) return 0;
  return Math.min(100, Math.round((galleryLoad(gallery, artifacts) / gallery.capacity) * 100));
}

export function remainingCapacity(gallery: Gallery, artifacts: Artifact[]): number {
  return Math.max(0, gallery.capacity - galleryLoad(gallery, artifacts));
}

export function totalDailyValue(artifacts: Artifact[]): number {
  return artifacts.reduce((sum, item) => sum + item.dayRate, 0);
}

export function availableDailyValue(artifacts: Artifact[]): number {
  return artifacts
    .filter((item) => item.status === 'draft' || item.status === 'cataloging')
    .reduce((sum, item) => sum + item.dayRate, 0);
}
