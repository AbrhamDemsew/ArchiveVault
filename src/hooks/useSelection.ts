import { useCallback, useMemo, useState } from 'react';

export function useSelection(visibleIds: string[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const visibleSet = useMemo(() => new Set(visibleIds), [visibleIds]);

  const selectedVisibleCount = selectedIds.filter((id) => visibleSet.has(id)).length;
  const allVisibleSelected = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
  const someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected;

  const toggle = useCallback((id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }, []);

  const toggleAllVisible = useCallback(() => {
    setSelectedIds((current) => {
      if (visibleIds.length === 0) return current;
      const allSelected = visibleIds.every((id) => current.includes(id));
      if (allSelected) {
        const hide = new Set(visibleIds);
        return current.filter((id) => !hide.has(id));
      }
      const next = new Set(current);
      visibleIds.forEach((id) => next.add(id));
      return [...next];
    });
  }, [visibleIds]);

  const clear = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const pruneToExisting = useCallback((existingIds: string[]) => {
    const existing = new Set(existingIds);
    setSelectedIds((current) => current.filter((id) => existing.has(id)));
  }, []);

  const isSelected = useCallback((id: string) => selectedIds.includes(id), [selectedIds]);

  return {
    selectedIds,
    toggle,
    toggleAllVisible,
    clear,
    pruneToExisting,
    isSelected,
    allVisibleSelected,
    someVisibleSelected,
    selectedVisibleCount,
  };
}
