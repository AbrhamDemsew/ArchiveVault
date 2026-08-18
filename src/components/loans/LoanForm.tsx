import { useState } from 'react';
import type { Gallery, Loan, LoanStatus, LoanType, Artifact } from '../../types/archive';
import { LOAN_STATUS_LABELS, LOAN_STATUSES, LOAN_TYPE_LABELS, LOAN_TYPES } from '../../types/archive';

interface LoanFormProps {
  galleries: Gallery[];
  artifacts: Artifact[];
  initial?: Loan | null;
  onCancel: () => void;
  onSubmit: (value: Omit<Loan, 'id'> & { id?: string }) => void;
}

export function LoanForm({ galleries, artifacts, initial, onCancel, onSubmit }: LoanFormProps) {
  const [artifactId, setArtifactId] = useState(initial?.artifactId ?? artifacts[0]?.id ?? '');
  const [galleryId, setGalleryId] = useState(initial?.galleryId ?? galleries[0]?.id ?? '');
  const [type, setType] = useState<LoanType>(initial?.type ?? 'conservation');
  const [status, setStatus] = useState<LoanStatus>(initial?.status ?? 'queued');
  const [startDate, setStartDate] = useState(initial?.startDate ?? '2026-07-01');
  const [endDate, setEndDate] = useState(initial?.endDate ?? '2026-07-08');
  const [editor, setEditor] = useState(initial?.editor ?? 'Metro Editor');
  const [cost, setCost] = useState(initial?.cost ?? 400);
  const [notes, setNotes] = useState(initial?.notes ?? '');

  return (
    <form
      className="panel-form"
      aria-label={initial ? 'Edit loan' : 'Add loan'}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          id: initial?.id, artifactId, galleryId, type, status, startDate, endDate, editor, cost: Number(cost), notes,
        });
      }}
    >
      <div className="form-grid">
        <div className="field">
          <label htmlFor="lon-artifact">Artifact</label>
          <select id="lon-artifact" value={artifactId} onChange={(event) => setArtifactId(event.target.value)}>
            {artifacts.map((item) => (<option key={item.id} value={item.id}>{item.sku}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="lon-gallery-form">Gallery</label>
          <select id="lon-gallery-form" value={galleryId} onChange={(event) => setGalleryId(event.target.value)}>
            {galleries.map((gallery) => (<option key={gallery.id} value={gallery.id}>{gallery.name}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="lon-type-form">Type</label>
          <select id="lon-type-form" value={type} onChange={(event) => setType(event.target.value as LoanType)}>
            {LOAN_TYPES.map((item) => (<option key={item} value={item}>{LOAN_TYPE_LABELS[item]}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="lon-status-form">Status</label>
          <select id="lon-status-form" value={status} onChange={(event) => setStatus(event.target.value as LoanStatus)}>
            {LOAN_STATUSES.map((item) => (<option key={item} value={item}>{LOAN_STATUS_LABELS[item]}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="lon-start">Start</label>
          <input id="lon-start" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="lon-end">End</label>
          <input id="lon-end" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="lon-editor">Editor</label>
          <input id="lon-editor" value={editor} onChange={(event) => setEditor(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="lon-cost">Cost</label>
          <input id="lon-cost" type="number" min={0} value={cost} onChange={(event) => setCost(Number(event.target.value))} />
        </div>
        <div className="field field-span">
          <label htmlFor="lon-notes">Notes</label>
          <textarea id="lon-notes" rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="button ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="button">{initial ? 'Save loan' : 'Add loan'}</button>
      </div>
    </form>
  );
}
