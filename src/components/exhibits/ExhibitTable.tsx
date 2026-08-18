import type { Gallery, Exhibit, Artifact } from '../../types/archive';
import { EXHIBIT_STATUS_LABELS } from '../../types/archive';
import { formatIsoDate, formatNumber, formatTime } from '../../utils/format';

interface ExhibitTableProps {
  exhibits: Exhibit[];
  artifacts: Artifact[];
  galleries: Gallery[];
  onEdit: (exhibit: Exhibit) => void;
  onDelete: (id: string) => void;
}

export function ExhibitTable({ exhibits, artifacts, galleries, onEdit, onDelete }: ExhibitTableProps) {
  const artifactLabel = (id: string) => artifacts.find((item) => item.id === id)?.sku ?? id;
  const galleryName = (id: string) => galleries.find((gallery) => gallery.id === id)?.name ?? id;

  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption className="visually-hidden">Exhibit arrivals</caption>
        <thead>
          <tr>
            <th scope="col">Exhibit</th>
            <th scope="col">Artifact</th>
            <th scope="col">Gallery</th>
            <th scope="col">Window</th>
            <th scope="col">Status</th>
            <th scope="col">Load</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exhibits.map((exhibit) => (
            <tr key={exhibit.id}>
              <td>
                <strong>{exhibit.name}</strong>
                <div className="muted">{exhibit.origin} → {exhibit.destination}</div>
              </td>
              <td>{artifactLabel(exhibit.artifactId)}</td>
              <td>{galleryName(exhibit.galleryId)}</td>
              <td>{formatIsoDate(exhibit.date)} {formatTime(exhibit.startTime)}–{formatTime(exhibit.endTime)}</td>
              <td>{EXHIBIT_STATUS_LABELS[exhibit.status]}</td>
              <td>{exhibit.loadPercent}% · {formatNumber(exhibit.durationMin)} min</td>
              <td>
                <button type="button" className="button tiny" aria-label={`Edit ${exhibit.name}`} onClick={() => onEdit(exhibit)}>Edit</button>
                <button type="button" className="button tiny danger" aria-label={`Remove ${exhibit.name}`} onClick={() => onDelete(exhibit.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
