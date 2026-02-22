import React from 'react';
import { actionsLog } from '../../../data/mockData';

const History = () => {
  const filteredLogs = actionsLog.filter(log => log.action.includes('validation') || log.action.includes('rejet'));

  return (
    <div className="card">
      <div className="card-header"><i className="bi bi-clock-history"></i> Historique des actions</div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr><th>Date</th><th>Action</th><th>Facture</th><th>Montant</th><th>Utilisateur</th></tr>
            </thead>
            <tbody>
              {filteredLogs.length ? filteredLogs.map((log, idx) => (
                <tr key={idx}>
                  <td>{new Date(log.timestamp).toLocaleDateString('fr-FR')}</td>
                  <td><span className={`badge badge-${log.action.includes('validation') ? 'success' : 'danger'}`}>{log.action}</span></td>
                  <td>{log.details.split(' ')[1] || ''}</td>
                  <td>-</td>
                  <td>{log.user}</td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="text-muted">Aucune action récente.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;