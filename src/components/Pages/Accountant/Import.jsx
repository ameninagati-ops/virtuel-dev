import React, { useState } from 'react';
import { uploadFiles } from '../../../services/api';

const Import = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    try {
      await uploadFiles(selectedFiles);
      alert('Fichiers uploadés avec succès');
      setSelectedFiles([]);
    } catch (error) {
      alert('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="upload-area mb-4">
        <i className="bi bi-cloud-arrow-up"></i>
        <h4>Scanner ou Importer des factures</h4>
        <p className="text-muted">Formats supportés : PDF, PNG, JPEG, XML</p>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.xml"
          onChange={handleFileSelect}
        />
        <button
          className="btn btn-primary px-5 py-3"
          onClick={() => document.getElementById('fileInput').click()}
          disabled={uploading}
        >
          <i className="bi bi-folder2-open me-2"></i> Parcourir les fichiers
        </button>
        {selectedFiles.length > 0 && (
          <div className="mt-3">
            <p>{selectedFiles.length} fichier(s) sélectionné(s) :</p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <button className="btn btn-success mt-2" onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Upload en cours...' : 'Uploader'}
            </button>
          </div>
        )}
      </div>

      <div className="quick-actions">
        <div className="quick-action" onClick={() => document.getElementById('fileInput').click()}>
          <i className="bi bi-scanner"></i>
          <span>Scan rapide</span>
        </div>
        <div className="quick-action" onClick={() => document.getElementById('fileInput').click()}>
          <i className="bi bi-files"></i>
          <span>Import multiple</span>
        </div>
        <div className="quick-action" onClick={() => alert('Simulation : import email')}>
          <i className="bi bi-cloud-arrow-down"></i>
          <span>Import email</span>
        </div>
        <div className="quick-action" onClick={() => alert('Simulation : photo')}>
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