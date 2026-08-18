import { useMemo, useState } from 'react';
import { LoanFilterBar } from '../components/loans/LoanFilters';
import { LoanForm } from '../components/loans/LoanForm';
import { LoanTable } from '../components/loans/LoanTable';
import { UI_COPY } from '../constants/featureFlags';
import { useArchiveStore } from '../hooks/useArchiveStore';
import { DEFAULT_LOAN_FILTERS, type LoanFilters } from '../types/filters';
import type { Loan } from '../types/archive';
import { filterLoans } from '../utils/loanFilters';

export function LoansPage() {
  const { loans, artifacts, galleries, addLoan, updateLoan, deleteLoan } = useArchiveStore();
  const [filters, setFilters] = useState<LoanFilters>(DEFAULT_LOAN_FILTERS);
  const [editing, setEditing] = useState<Loan | null>(null);
  const [showForm, setShowForm] = useState(false);
  const visible = useMemo(() => filterLoans(loans, filters), [loans, filters]);

  return (
    <section className="page">
      <div className="page-toolbar">
        <p className="muted">{visible.length} of {loans.length} loans in view</p>
        <button type="button" className="button" onClick={() => { setEditing(null); setShowForm(true); }}>Add loan</button>
      </div>
      <LoanFilterBar filters={filters} galleries={galleries} onChange={setFilters} onReset={() => setFilters(DEFAULT_LOAN_FILTERS)} />
      {showForm ? (
        <LoanForm
          galleries={galleries}
          artifacts={artifacts}
          initial={editing}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          onSubmit={(value) => {
            if (value.id) updateLoan(value.id, value);
            else {
              addLoan({
                artifactId: value.artifactId, galleryId: value.galleryId, type: value.type, status: value.status,
                startDate: value.startDate, endDate: value.endDate, editor: value.editor, cost: value.cost, notes: value.notes,
              });
            }
            setShowForm(false);
            setEditing(null);
          }}
        />
      ) : null}
      {visible.length === 0 ? (
        <p className="empty">{UI_COPY.emptyLoans}</p>
      ) : (
        <LoanTable
          records={visible}
          artifacts={artifacts}
          galleries={galleries}
          onEdit={(record) => { setEditing(record); setShowForm(true); }}
          onDelete={deleteLoan}
        />
      )}
    </section>
  );
}
