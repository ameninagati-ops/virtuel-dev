import React, { useState } from 'react';
import { thresholds as initialThresholds } from '../../../data/mockData';

const Thresholds = () => {
  const [thresholds, setThresholds] = useState(initialThresholds);

  const handleOcrChange = (e) => {
    const value = parseInt(e.target.value);
    setThresholds({ ...thresholds, ocrConfidence: value });
  };

  const handleAutoChange = (e) => {
    const value = parseInt(e.target.value);
    setThresholds({ ...thresholds, autoValidationAmount: value });
  };

  const handleRequiredChange = (e) => {
    const value = parseInt(e.target.value);
    setThresholds({ ...thresholds, requiredValidationAmount: value });
  };

  const saveThresholds = () => {
    // Ici on pourrait sauvegarder dans une vraie base, mais pour l'instant on simule
    alert('Configuration enregistrée (simulation)');
    console.log('Nouveaux seuils :', thresholds);
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <i className="bi bi-sliders2"></i>
            Configuration des seuils IA
          </div>
          <div className="card-body">
            <div className="range-slider-container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="form-label">Seuil de confiance OCR</label>
                <span className="badge badge-primary">{thresholds.ocrConfidence}%</span>
              </div>
              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={thresholds.ocrConfidence}
                onChange={handleOcrChange}
              />
              <p className="small text-muted mt-2">
                <i className="bi bi-info-circle me-2"></i>
                En dessous de ce seuil, une validation humaine est requise
              </p>
            </div>

            <div className="range-slider-container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="form-label">Montant validation automatique</label>
                <span className="badge badge-primary">{thresholds.autoValidationAmount}€</span>
              </div>
              <input
                type="range"
                className="form-range"
                min="0"
                max="10000"
                step="100"
                value={thresholds.autoValidationAmount}
                onChange={handleAutoChange}
              />
              <p className="small text-muted mt-2">
                <i className="bi bi-info-circle me-2"></i>
                Factures en dessous de ce montant automatiquement validées
              </p>
            </div>

            <div className="range-slider-container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="form-label">Montant validation requise</label>
                <span className="badge badge-primary">{thresholds.requiredValidationAmount}€</span>
              </div>
              <input
                type="range"
                className="form-range"
                min="1000"
                max="50000"
                step="500"
                value={thresholds.requiredValidationAmount}
                onChange={handleRequiredChange}
              />
              <p className="small text-muted mt-2">
                <i className="bi bi-info-circle me-2"></i>
                Factures au-dessus de ce montant nécessitent validation
              </p>
            </div>

            <div className="threshold-card">
              <div className="threshold-info">
                <h6>Résumé de la configuration</h6>
                <small>Seuils actuellement appliqués</small>
              </div>
              <div></div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-md-4">
                <div className="threshold-card">
                  <div className="threshold-info">
                    <small>Confiance OCR</small>
                  </div>
                  <div className="threshold-value">{thresholds.ocrConfidence}%</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="threshold-card">
                  <div className="threshold-info">
                    <small>Auto &lt;</small>
                  </div>
                  <div className="threshold-value">{thresholds.autoValidationAmount}€</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="threshold-card">
                  <div className="threshold-info">
                    <small>&gt; Validation</small>
                  </div>
                  <div className="threshold-value">{thresholds.requiredValidationAmount}€</div>
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-100 mt-4" onClick={saveThresholds}>
              <i className="bi bi-check-lg me-2"></i>
              Enregistrer la configuration
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <i className="bi bi-info-circle"></i>
            Impact des seuils
          </div>
          <div className="card-body">
            <div className="threshold-card">
              <div className="threshold-info">
                <h6>Factures auto validées</h6>
                <small>Ce mois</small>
              </div>
              <div className="threshold-value">47</div>
            </div>

            <div className="threshold-card">
              <div className="threshold-info">
                <h6>En attente validation</h6>
                <small>Nécessitent relecture</small>
              </div>
              <div className="threshold-value">12</div>
            </div>

            <div className="threshold-card">
              <div className="threshold-info">
                <h6>Nécessitent approbation</h6>
                <small>&gt; {thresholds.requiredValidationAmount}€</small>
              </div>
              <div className="threshold-value">5</div>
            </div>

            <hr style={{ borderColor: '#1e3a5f' }} />

            <p className="small text-muted">
              <i className="bi bi-lightbulb me-2"></i>
              Ajustez les seuils pour optimiser le flux de validation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thresholds;