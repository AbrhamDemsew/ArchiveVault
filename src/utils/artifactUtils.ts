import type { Artifact, ArtifactStatus } from '../types/archive';

export function nextSku(artifacts: Artifact[]): string {
  const max = artifacts.reduce((current, item) => {
    const match = item.sku.match(/AV-(\d+)/);
    const value = match ? Number(match[1]) : 0;
    return Math.max(current, value);
  }, 0);
  return `AV-${String(max + 1).padStart(3, '0')}`;
}

export function canDisplay(item: Artifact): boolean {
  return item.status === 'draft' || item.status === 'cataloging';
}

export function statusTone(status: ArtifactStatus): 'ok' | 'warn' | 'danger' | 'neutral' {
  switch (status) {
    case 'draft':
    case 'cataloging':
      return 'ok';
    case 'on_loan':
    case 'displayed':
      return 'warn';
    case 'deaccessioned':
      return 'danger';
  }
}

export function curatorEmail(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.+|\.+$/g, '');
  return `${slug}@archivevault.local`;
}
