import React from 'react';
import { extractions } from '../../../data/mockData';

const Extractions = () => {
  const viewExtraction = (id) => {
    alert(`Détails de l'extraction #${id} (simulation)`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <i className="bi bi-cpu"></i> Extractions IA en cours
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Progression</th>
                <th>Confiance</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {extractions.map(ext => (
                <tr key={ext.id}>
                  <td>
                    <i className={`bi bi-file-${ext.file.includes('.pdf') ? 'pdf text-danger' : 'image text-success'} me-2`}></i>
                    {ext.file}
                  </td>
                  <td>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className={`progress-bar bg-${ext.status === 'completed' ? 'success' : 'info'}`} style={{ width: `${ext.progress}%` }}></div>
                    </div>
                    <small className="text-muted">{ext.progress}%</small>
                  </td>
                  <td>
                    <span className={`badge badge-${ext.confidence > 90 ? 'success' : ext.confidence > 70 ? 'warning' : 'danger'}`}>
                      {ext.confidence}%
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${ext.status === 'completed' ? 'success' : 'warning'}`}>
                      {ext.status === 'completed' ? 'Terminé' : 'En cours'}
                    </span>
                  </td>
                  <td>
                    {ext.status === 'completed' ? (
                      <button className="btn btn-sm btn-outline-primary" onClick={() => viewExtraction(ext.id)}>
                        <i className="bi bi-eye"></i>
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-outline-warning">
                        <i className="bi bi-arrow-repeat"></i>
                      </button>
                    )}
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

export default Extractions;