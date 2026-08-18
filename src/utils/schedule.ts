import type { Exhibit, Artifact } from '../types/archive';

export function minutesBetween(startTime: string, endTime: string): number {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  return endH * 60 + endM - (startH * 60 + startM);
}

export function overlappingExhibits(a: Exhibit, b: Exhibit): boolean {
  if (a.artifactId !== b.artifactId || a.date !== b.date || a.id === b.id) return false;
  if (a.status === 'spiked' || b.status === 'spiked') return false;
  return a.startTime < b.endTime && b.startTime < a.endTime;
}

export function artifactsDueSoon(artifacts: Artifact[], withinFeet: number, cycleEvery = 30): Artifact[] {
  return artifacts.filter((item) => {
    const remainder = item.columnInches % cycleEvery;
    return cycleEvery - remainder <= withinFeet;
  });
}
