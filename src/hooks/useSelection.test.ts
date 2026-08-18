import { renderHook, act } from '@testing-library/react';
import { useSelection } from '../hooks/useSelection';

describe('useSelection', () => {
  it('toggles individual ids and select-all for the visible set', () => {
    const { result } = renderHook(() => useSelection(['a', 'b', 'c']));

    act(() => result.current.toggle('a'));
    expect(result.current.selectedIds).toEqual(['a']);
    expect(result.current.isSelected('a')).toBe(true);

    act(() => result.current.toggleAllVisible());
    expect(result.current.selectedIds).toEqual(['a', 'b', 'c']);
    expect(result.current.allVisibleSelected).toBe(true);

    act(() => result.current.toggleAllVisible());
    expect(result.current.selectedIds).toEqual([]);
  });

  it('keeps hidden ids when toggling only visible rows', () => {
    const { result, rerender } = renderHook(({ ids }) => useSelection(ids), {
      initialProps: { ids: ['a', 'b'] },
    });

    act(() => result.current.toggle('a'));
    rerender({ ids: ['b', 'c'] });
    act(() => result.current.toggleAllVisible());
    expect(result.current.selectedIds).toEqual(['a', 'b', 'c']);
  });

  it('prunes ids that no longer exist', () => {
    const { result } = renderHook(() => useSelection(['a', 'b']));
    act(() => result.current.toggle('a'));
    act(() => result.current.toggle('b'));
    act(() => result.current.pruneToExisting(['b']));
    expect(result.current.selectedIds).toEqual(['b']);
  });
});
