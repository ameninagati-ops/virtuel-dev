import React from 'react';

const Import = () => {
  const simulateUpload = () => alert('Simulation : ouverture de la boîte de dialogue');
  const simulateScan = () => alert('Simulation : scan lancé');
  const simulateEmail = () => alert('Simulation : connexion email');
  const simulatePhoto = () => alert('Simulation : appareil photo');

  return (
    <>
      <div className="upload-area mb-4">
        <i className="bi bi-cloud-arrow-up"></i>
        <h4>Scanner ou Importer des factures</h4>
        <p className="text-muted">Formats supportés : PDF, PNG, JPEG, XML</p>
        <button className="btn btn-primary px-5 py-3" onClick={simulateUpload}>
          <i className="bi bi-folder2-open me-2"></i> Parcourir les fichiers
        </button>
      </div>

      <div className="quick-actions">
        <div className="quick-action" onClick={simulateScan}>
          <i className="bi bi-scanner"></i>
          <span>Scan rapide</span>
        </div>
        <div className="quick-action" onClick={simulateUpload}>
          <i className="bi bi-files"></i>
          <span>Import multiple</span>
        </div>
        <div className="quick-action" onClick={simulateEmail}>
          <i className="bi bi-cloud-arrow-down"></i>
          <span>Import email</span>
        </div>
        <div className="quick-action" onClick={simulatePhoto}>
          <i className="bi bi-camera"></i>
          <span>Photo</span>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <i className="bi bi-clock-history"></i> Importations récentes
        </div>
        <div className="card-body">
          <div className="list-group">
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-file-pdf text-danger me-2"></i>
                FAC_2026_001.pdf
              </div>
              <span className="badge badge-warning">En attente</span>
            </div>
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-file-image text-success me-2"></i>
                FACTURE_2026_045.png
              </div>
              <span className="badge badge-success">Traité</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Import;