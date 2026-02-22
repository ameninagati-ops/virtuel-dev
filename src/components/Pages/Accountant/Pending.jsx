import React from 'react';
import { invoices } from '../../../data/mockData';

const Pending = () => {
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending' || inv.status === 'urgent');

  return (
    <div className="card">
      <div className="card-header">
        <i className="bi bi-clock-history"></i> En attente ({pendingInvoices.length})
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Fournisseur</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvoices.map(inv => (
                <tr key={inv.id}>
                  <td><strong style={{ color: 'white' }}>{inv.ref}</strong></td>
                  <td>{inv.supplier}</td>
                  <td><span className="fw-bold">{inv.amount.toLocaleString()} €</span></td>
                  <td>{new Date(inv.date).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span className={`badge badge-${inv.status === 'urgent' ? 'danger' : 'warning'}`}>
                      {inv.status === 'urgent' ? 'Urgent' : 'En attente'}
                    </span>
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

export default Pending;