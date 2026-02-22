import React from 'react';
import { invoices } from '../../../data/mockData';

const Validations = () => {
  const pendingInvoices = invoices.filter(i => i.status === 'pending' || i.status === 'urgent');

  const openValidationModal = (id) => alert(`Validation facture #${id} (simulation)`);
  const openRejectModal = (id) => alert(`Rejet facture #${id} (simulation)`);

  return (
    <div className="card">
      <div className="card-header"><i className="bi bi-check2-square"></i> Toutes les validations en attente</div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr><th>Référence</th><th>Fournisseur</th><th>Montant</th><th>Date</th><th>Type</th><th>Soumis par</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {pendingInvoices.map(inv => (
                <tr key={inv.id}>
                  <td><strong style={{ color: 'white' }}>{inv.ref}</strong></td>
                  <td>{inv.supplier}</td>
                  <td><span className="fw-bold">{inv.amount.toLocaleString()} €</span></td>
                  <td>{new Date(inv.date).toLocaleDateString('fr-FR')}</td>
                  <td><span className={`badge badge-${inv.type === 'invoice' ? 'primary' : 'warning'}`}>{inv.type === 'invoice' ? 'Facture' : 'Note de frais'}</span></td>
                  <td>{inv.submittedBy}</td>
                  <td>
                    <button className="btn btn-sm btn-success me-1" onClick={() => openValidationModal(inv.id)}><i className="bi bi-check-lg"></i></button>
                    <button className="btn btn-sm btn-danger" onClick={() => openRejectModal(inv.id)}><i className="bi bi-x-lg"></i></button>
                    <button className="btn btn-sm btn-outline-primary ms-1"><i className="bi bi-eye"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Validations;