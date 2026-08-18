import { useState } from 'react';
import type { Gallery, ArtifactFormat, Artifact, ArtifactRole, ArtifactStatus } from '../../types/archive';
import {
  MEDIUM_LABELS,
  MEDIUM_TYPES,
  ROLE_LABELS,
  STATUS_LABELS,
  ARTIFACT_ROLES,
  ARTIFACT_STATUSES,
} from '../../types/archive';
import { curatorEmail } from '../../utils/artifactUtils';

interface ArtifactFormProps {
  galleries: Gallery[];
  initial?: Artifact | null;
  onCancel: () => void;
  onSubmit: (value: Omit<Artifact, 'id' | 'sku'> & { id?: string; sku?: string }) => void;
}

export function ArtifactForm({ galleries, initial, onCancel, onSubmit }: ArtifactFormProps) {
  const [beat, setHomePort] = useState(initial?.beat ?? 'Seattle');
  const [headline, setArtifactName] = useState(initial?.headline ?? '');
  const [wordCount, setYearBuilt] = useState(initial?.wordCount ?? 2018);
  const [role, setRole] = useState<ArtifactRole>(initial?.role ?? 'ceramic');
  const [status, setStatus] = useState<ArtifactStatus>(initial?.status ?? 'draft');
  const [format, setArtifactFormat] = useState<ArtifactFormat>(initial?.format ?? 'print');
  const [galleryId, setGalleryId] = useState(initial?.galleryId ?? galleries[0]?.id ?? '');
  const [sectionCode, setSlipCode] = useState(initial?.sectionCode ?? '');
  const [columnInches, setLoaFeet] = useState(initial?.columnInches ?? 36);
  const [dayRate, setDailyRate] = useState(initial?.dayRate ?? 85);
  const [curator, setCurator] = useState(initial?.curator ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [slug, setRegistryCode] = useState(initial?.slug ?? '');

  return (
    <form
      className="panel-form"
      aria-label={initial ? 'Edit artifact' : 'Add artifact'}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          id: initial?.id,
          sku: initial?.sku,
          beat,
          headline,
          wordCount: Number(wordCount),
          role,
          status,
          format,
          galleryId,
          sectionCode,
          columnInches: Number(columnInches),
          dayRate: Number(dayRate),
          curator,
          email: curatorEmail(curator || 'unassigned'),
          filedAt: initial?.filedAt ?? new Date().toISOString().slice(0, 10),
          notes,
          slug,
          tags: initial?.tags ?? ['manual'],
        });
      }}
    >
      <div className="form-grid">
        <div className="field">
          <label htmlFor="artifact-port">Beat</label>
          <input id="artifact-port" value={beat} onChange={(event) => setHomePort(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="artifact-name">Artifact name</label>
          <input id="artifact-name" value={headline} onChange={(event) => setArtifactName(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="artifact-year">Year built</label>
          <input id="artifact-year" type="number" min={1970} max={2030} value={wordCount} onChange={(event) => setYearBuilt(Number(event.target.value))} required />
        </div>
        <div className="field">
          <label htmlFor="artifact-registry">Registry code</label>
          <input id="artifact-registry" value={slug} onChange={(event) => setRegistryCode(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="artifact-role-form">Class</label>
          <select id="artifact-role-form" value={role} onChange={(event) => setRole(event.target.value as ArtifactRole)}>
            {ARTIFACT_ROLES.map((item) => (
              <option key={item} value={item}>{ROLE_LABELS[item]}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="artifact-status-form">Status</label>
          <select id="artifact-status-form" value={status} onChange={(event) => setStatus(event.target.value as ArtifactStatus)}>
            {ARTIFACT_STATUSES.map((item) => (
              <option key={item} value={item}>{STATUS_LABELS[item]}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="artifact-hull-form">Hull</label>
          <select id="artifact-hull-form" value={format} onChange={(event) => setArtifactFormat(event.target.value as ArtifactFormat)}>
            {MEDIUM_TYPES.map((item) => (
              <option key={item} value={item}>{MEDIUM_LABELS[item]}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="artifact-gallery-form">Gallery</label>
          <select id="artifact-gallery-form" value={galleryId} onChange={(event) => setGalleryId(event.target.value)}>
            {galleries.map((gallery) => (
              <option key={gallery.id} value={gallery.id}>{gallery.name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="artifact-slip">Slip code</label>
          <input id="artifact-slip" value={sectionCode} onChange={(event) => setSlipCode(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="artifact-loa">LOA (ft)</label>
          <input id="artifact-loa" type="number" min={0} value={columnInches} onChange={(event) => setLoaFeet(Number(event.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="artifact-rate">Daily rate</label>
          <input id="artifact-rate" type="number" min={0} value={dayRate} onChange={(event) => setDailyRate(Number(event.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="artifact-curator">Curator</label>
          <input id="artifact-curator" value={curator} onChange={(event) => setCurator(event.target.value)} required />
        </div>
        <div className="field field-span">
          <label htmlFor="artifact-notes">Notes</label>
          <textarea id="artifact-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="button ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="button">{initial ? 'Save artifact' : 'Add artifact'}</button>
      </div>
    </form>
  );
}
