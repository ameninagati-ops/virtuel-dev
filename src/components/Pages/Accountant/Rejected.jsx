import React from 'react';
import { invoices } from '../../../data/mockData';

const Rejected = () => {
  const rejected = invoices.filter(i => i.status === 'rejected');

  return (
    <div className="card">
      <div className="card-header"><i className="bi bi-x-circle"></i> Factures rejetées ({rejected.length})</div>
      <div className="card-body">
        {rejected.length ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr><th>Réf.</th><th>Fournisseur</th><th>Montant</th><th>Date</th><th>Motif</th></tr>
              </thead>
              <tbody>
                {rejected.map(inv => (
                  <tr key={inv.id}>
                    <td>{inv.ref}</td>
                    <td>{inv.supplier}</td>
                    <td>{inv.amount.toLocaleString()} €</td>
                    <td>{new Date(inv.date).toLocaleDateString('fr-FR')}</td>
                    <td><span className="badge badge-danger">Document illisible</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">Aucune facture rejetée.</p>
        )}
      </div>
    </div>
  );
};

export default Rejected;