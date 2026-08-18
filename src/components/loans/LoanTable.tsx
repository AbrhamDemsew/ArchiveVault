import type { Gallery, Loan, Artifact } from '../../types/archive';
import { LOAN_STATUS_LABELS, LOAN_TYPE_LABELS } from '../../types/archive';
import { formatCurrency, formatIsoDate } from '../../utils/format';

interface LoanTableProps {
  records: Loan[];
  artifacts: Artifact[];
  galleries: Gallery[];
  onEdit: (record: Loan) => void;
  onDelete: (id: string) => void;
}

export function LoanTable({ records, artifacts, galleries, onEdit, onDelete }: LoanTableProps) {
  const artifactLabel = (id: string) => artifacts.find((item) => item.id === id)?.sku ?? id;
  const galleryName = (id: string) => galleries.find((gallery) => gallery.id === id)?.name ?? id;

  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption className="visually-hidden">Loan tickets</caption>
        <thead>
          <tr>
            <th scope="col">Loan</th>
            <th scope="col">Artifact</th>
            <th scope="col">Gallery</th>
            <th scope="col">Window</th>
            <th scope="col">Status</th>
            <th scope="col">Cost</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <strong>{LOAN_TYPE_LABELS[record.type]}</strong>
                <div className="muted">{record.editor}</div>
              </td>
              <td>{artifactLabel(record.artifactId)}</td>
              <td>{galleryName(record.galleryId)}</td>
              <td>{formatIsoDate(record.startDate)} – {formatIsoDate(record.endDate)}</td>
              <td>{LOAN_STATUS_LABELS[record.status]}</td>
              <td>{formatCurrency(record.cost)}</td>
              <td>
                <button type="button" className="button tiny" aria-label={`Edit ${LOAN_TYPE_LABELS[record.type]} for ${artifactLabel(record.artifactId)}`} onClick={() => onEdit(record)}>Edit</button>
                <button type="button" className="button tiny danger" aria-label={`Remove ${LOAN_TYPE_LABELS[record.type]} for ${artifactLabel(record.artifactId)}`} onClick={() => onDelete(record.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
