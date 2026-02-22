import React from 'react';
import { invoices } from '../../../data/mockData';

const Validated = () => {
  const validated = invoices.filter(i => i.status === 'approved');

  return (
    <div className="card">
      <div className="card-header"><i className="bi bi-check2-all"></i> Factures validées ({validated.length})</div>
      <div className="card-body">
        {validated.length ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr><th>Réf.</th><th>Fournisseur</th><th>Montant</th><th>Date</th><th>Type</th></tr>
              </thead>
              <tbody>
                {validated.map(inv => (
                  <tr key={inv.id}>
                    <td>{inv.ref}</td>
                    <td>{inv.supplier}</td>
                    <td>{inv.amount.toLocaleString()} €</td>
                    <td>{new Date(inv.date).toLocaleDateString('fr-FR')}</td>
                    <td><span className="badge badge-success">{inv.type === 'invoice' ? 'Facture' : 'NDF'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">Aucune facture validée pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Validated;