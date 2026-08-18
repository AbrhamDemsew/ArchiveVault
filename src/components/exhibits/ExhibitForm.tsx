import { useState } from 'react';
import type { Gallery, Exhibit, ExhibitStatus, Artifact } from '../../types/archive';
import { EXHIBIT_STATUS_LABELS, EXHIBIT_STATUSES } from '../../types/archive';

interface ExhibitFormProps {
  galleries: Gallery[];
  artifacts: Artifact[];
  initial?: Exhibit | null;
  onCancel: () => void;
  onSubmit: (value: Omit<Exhibit, 'id'> & { id?: string }) => void;
}

export function ExhibitForm({ galleries, artifacts, initial, onCancel, onSubmit }: ExhibitFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [artifactId, setArtifactId] = useState(initial?.artifactId ?? artifacts[0]?.id ?? '');
  const [galleryId, setGalleryId] = useState(initial?.galleryId ?? galleries[0]?.id ?? '');
  const [origin, setOrigin] = useState(initial?.origin ?? '');
  const [destination, setDestination] = useState(initial?.destination ?? '');
  const [date, setDate] = useState(initial?.date ?? '2026-06-01');
  const [startTime, setStartTime] = useState(initial?.startTime ?? '07:00');
  const [endTime, setEndTime] = useState(initial?.endTime ?? '09:00');
  const [status, setStatus] = useState<ExhibitStatus>(initial?.status ?? 'scheduled');
  const [durationMin, setDurationMin] = useState(initial?.durationMin ?? 90);
  const [loadPercent, setLoadPercent] = useState(initial?.loadPercent ?? 70);
  const [notes, setNotes] = useState(initial?.notes ?? '');

  return (
    <form
      className="panel-form"
      aria-label={initial ? 'Edit exhibit' : 'Add exhibit'}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          id: initial?.id, name, artifactId, galleryId, origin, destination, date, startTime, endTime, status,
          durationMin: Number(durationMin), loadPercent: Number(loadPercent), notes,
        });
      }}
    >
      <div className="form-grid">
        <div className="field field-span">
          <label htmlFor="exb-name">Exhibit name</label>
          <input id="exb-name" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="exb-artifact">Artifact</label>
          <select id="exb-artifact" value={artifactId} onChange={(event) => setArtifactId(event.target.value)}>
            {artifacts.map((item) => (<option key={item.id} value={item.id}>{item.sku}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="exb-gallery-form">Gallery</label>
          <select id="exb-gallery-form" value={galleryId} onChange={(event) => setGalleryId(event.target.value)}>
            {galleries.map((gallery) => (<option key={gallery.id} value={gallery.id}>{gallery.name}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="exb-origin">From</label>
          <input id="exb-origin" value={origin} onChange={(event) => setOrigin(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="exb-dest">To</label>
          <input id="exb-dest" value={destination} onChange={(event) => setDestination(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="exb-date">Date</label>
          <input id="exb-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="exb-start">Start</label>
          <input id="exb-start" type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="exb-end">End</label>
          <input id="exb-end" type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="exb-status-form">Status</label>
          <select id="exb-status-form" value={status} onChange={(event) => setStatus(event.target.value as ExhibitStatus)}>
            {EXHIBIT_STATUSES.map((item) => (<option key={item} value={item}>{EXHIBIT_STATUS_LABELS[item]}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="exb-min">Duration (min)</label>
          <input id="exb-min" type="number" min={1} value={durationMin} onChange={(event) => setDurationMin(Number(event.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="exb-load">Load %</label>
          <input id="exb-load" type="number" min={0} max={100} value={loadPercent} onChange={(event) => setLoadPercent(Number(event.target.value))} />
        </div>
        <div className="field field-span">
          <label htmlFor="exb-notes">Notes</label>
          <textarea id="exb-notes" rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="button ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="button">{initial ? 'Save exhibit' : 'Add exhibit'}</button>
      </div>
    </form>
  );
}
