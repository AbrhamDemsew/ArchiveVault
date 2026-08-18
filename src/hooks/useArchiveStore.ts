import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { DEFAULT_FEATURE_FLAGS, type FeatureFlag } from '../constants/featureFlags';
import { seedGalleries } from '../data/seedGalleries';
import { seedExhibits } from '../data/seedExhibits';
import { seedLoans } from '../data/seedLoans';
import { seedArtifacts } from '../data/seedArtifacts';
import type { Gallery, Exhibit, Loan, Artifact } from '../types/archive';
import { nextSku } from '../utils/artifactUtils';
import { shortId } from '../utils/ids';

export interface ArchiveState {
  galleries: Gallery[];
  artifacts: Artifact[];
  exhibits: Exhibit[];
  loans: Loan[];
  flags: FeatureFlag[];
}

const listeners = new Set<() => void>();

let state: ArchiveState = {
  galleries: seedGalleries,
  artifacts: seedArtifacts,
  exhibits: seedExhibits,
  loans: seedLoans,
  flags: DEFAULT_FEATURE_FLAGS,
};

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(updater: (current: ArchiveState) => ArchiveState) {
  state = updater(state);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function useArchiveStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const addArtifact = useCallback((input: Omit<Artifact, 'id' | 'sku'>) => {
    setState((current) => {
      const next: Artifact = {
        ...input,
        id: shortId('art'),
        sku: nextSku(current.artifacts),
      };
      return { ...current, artifacts: [...current.artifacts, next] };
    });
  }, []);

  const updateArtifact = useCallback((id: string, patch: Partial<Artifact>) => {
    setState((current) => ({
      ...current,
      artifacts: current.artifacts.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }, []);

  const deleteArtifact = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      artifacts: current.artifacts.filter((item) => item.id !== id),
      exhibits: current.exhibits.filter((exhibit) => exhibit.artifactId !== id),
      loans: current.loans.filter((record) => record.artifactId !== id),
    }));
  }, []);

  const addExhibit = useCallback((input: Omit<Exhibit, 'id'>) => {
    setState((current) => ({
      ...current,
      exhibits: [...current.exhibits, { ...input, id: shortId('exb') }],
    }));
  }, []);

  const updateExhibit = useCallback((id: string, patch: Partial<Exhibit>) => {
    setState((current) => ({
      ...current,
      exhibits: current.exhibits.map((exhibit) => (exhibit.id === id ? { ...exhibit, ...patch } : exhibit)),
    }));
  }, []);

  const deleteExhibit = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      exhibits: current.exhibits.filter((exhibit) => exhibit.id !== id),
    }));
  }, []);

  const addLoan = useCallback((input: Omit<Loan, 'id'>) => {
    setState((current) => ({
      ...current,
      loans: [...current.loans, { ...input, id: shortId('lon') }],
    }));
  }, []);

  const updateLoan = useCallback((id: string, patch: Partial<Loan>) => {
    setState((current) => ({
      ...current,
      loans: current.loans.map((record) => (record.id === id ? { ...record, ...patch } : record)),
    }));
  }, []);

  const deleteLoan = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      loans: current.loans.filter((record) => record.id !== id),
    }));
  }, []);

  const toggleFlag = useCallback((key: string) => {
    setState((current) => ({
      ...current,
      flags: current.flags.map((flag) => (flag.key === key ? { ...flag, enabled: !flag.enabled } : flag)),
    }));
  }, []);

  const resetArchive = useCallback(() => {
    setState(() => ({
      galleries: seedGalleries,
      artifacts: seedArtifacts,
      exhibits: seedExhibits,
      loans: seedLoans,
      flags: DEFAULT_FEATURE_FLAGS,
    }));
  }, []);

  return useMemo(
    () => ({
      ...snapshot,
      addArtifact,
      updateArtifact,
      deleteArtifact,
      addExhibit,
      updateExhibit,
      deleteExhibit,
      addLoan,
      updateLoan,
      deleteLoan,
      toggleFlag,
      resetArchive,
    }),
    [
      snapshot,
      addArtifact,
      updateArtifact,
      deleteArtifact,
      addExhibit,
      updateExhibit,
      deleteExhibit,
      addLoan,
      updateLoan,
      deleteLoan,
      toggleFlag,
      resetArchive,
    ],
  );
}

export function __resetArchiveStoreForTests() {
  state = {
    galleries: seedGalleries,
    artifacts: seedArtifacts,
    exhibits: seedExhibits,
    loans: seedLoans,
    flags: DEFAULT_FEATURE_FLAGS,
  };
  emit();
}
