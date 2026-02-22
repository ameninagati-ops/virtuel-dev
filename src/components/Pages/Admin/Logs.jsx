import React from 'react';
import { actionsLog } from '../../../data/mockData';

const Logs = () => {
  return (
    <div className="card">
      <div className="card-header">
        <i className="bi bi-journal-text"></i> Journaux d'activité
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Date/Heure</th>
                <th>Utilisateur</th>
                <th>Action</th>
                <th>Détails</th>
              </tr>
            </thead>
            <tbody>
              {actionsLog.slice().reverse().map((log, index) => (
                <tr key={index}>
                  <td>{new Date(log.timestamp).toLocaleString('fr-FR')}</td>
                  <td>{log.user}</td>
                  <td><span className="badge badge-info">{log.action}</span></td>
                  <td>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Logs;