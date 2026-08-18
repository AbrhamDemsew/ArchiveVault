import type { Gallery, Artifact } from '../../types/archive';
import { ROLE_LABELS, STATUS_LABELS } from '../../types/archive';
import { formatFeet, formatStatus } from '../../utils/format';
import { statusTone } from '../../utils/artifactUtils';

interface ArtifactTableProps {
  artifacts: Artifact[];
  galleries: Gallery[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  someVisibleSelected: boolean;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onEdit: (item: Artifact) => void;
  onDelete: (id: string) => void;
}

export function ArtifactTable({
  artifacts,
  galleries,
  selectedIds,
  allVisibleSelected,
  someVisibleSelected,
  onToggle,
  onToggleAll,
  onEdit,
  onDelete,
}: ArtifactTableProps) {
  const galleryName = (id: string) => galleries.find((gallery) => gallery.id === id)?.name ?? id;

  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption className="visually-hidden">Artifact roster</caption>
        <thead>
          <tr>
            <th scope="col">
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  ref={(node) => {
                    if (node) node.indeterminate = someVisibleSelected;
                  }}
                  onChange={onToggleAll}
                  aria-label="Select all visible artifacts"
                />
                <span>Select</span>
              </label>
            </th>
            <th scope="col">SKU</th>
            <th scope="col">Class</th>
            <th scope="col">Status</th>
            <th scope="col">Gallery</th>
            <th scope="col">Curator</th>
            <th scope="col">LOA</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {artifacts.map((item) => {
            const selected = selectedIds.includes(item.id);
            return (
              <tr key={item.id} className={selected ? 'is-selected' : undefined}>
                <td>
                  <label className="check-label">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onToggle(item.id)}
                      aria-label={`Select ${item.sku}`}
                    />
                    <span className="visually-hidden">{item.sku}</span>
                  </label>
                </td>
                <td>
                  <strong>{item.sku}</strong>
                  <div className="muted">
                    {item.wordCount} {item.beat} · {item.headline}
                  </div>
                </td>
                <td>{ROLE_LABELS[item.role]}</td>
                <td>
                  <span className={`status-pill tone-${statusTone(item.status)}`}>
                    {formatStatus(item.status)}
                  </span>
                  <span className="visually-hidden">Status: {STATUS_LABELS[item.status]}</span>
                </td>
                <td>{galleryName(item.galleryId)}</td>
                <td>
                  <div>{item.curator}</div>
                  <div className="muted">{item.email}</div>
                </td>
                <td>{formatFeet(item.columnInches)}</td>
                <td>
                  <button type="button" className="button tiny" aria-label={`Edit ${item.sku}`} onClick={() => onEdit(item)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="button tiny danger"
                    aria-label={`Remove ${item.sku}`}
                    onClick={() => onDelete(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
