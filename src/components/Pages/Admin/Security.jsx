import React, { useState } from 'react';

const Security = () => {
  const [policy1, setPolicy1] = useState(true);
  const [policy2, setPolicy2] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [sessionHours, setSessionHours] = useState(8);

  return (
    <div className="card">
      <div className="card-header">
        <i className="bi bi-shield-check"></i> Paramètres de sécurité
      </div>
      <div className="card-body">
        <div className="mb-4">
          <h6>Politique de mots de passe</h6>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="policy1" checked={policy1} onChange={(e) => setPolicy1(e.target.checked)} />
            <label className="form-check-label">Exiger 12 caractères minimum</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="policy2" checked={policy2} onChange={(e) => setPolicy2(e.target.checked)} />
            <label className="form-check-label">Majuscule, minuscule, chiffre et spécial</label>
          </div>
        </div>
        <div className="mb-4">
          <h6>Authentification à deux facteurs</h6>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="2fa" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} />
            <label className="form-check-label">Activer 2FA pour tous les utilisateurs</label>
          </div>
        </div>
        <div className="mb-4">
          <h6>Session</h6>
          <label>Durée maximum de session (heures)</label>
          <input type="number" className="form-control" value={sessionHours} min="1" max="24" onChange={(e) => setSessionHours(parseInt(e.target.value) || 8)} />
        </div>
        <button className="btn btn-primary" onClick={() => alert('Paramètres de sécurité enregistrés (simulation)')}>Enregistrer</button>
      </div>
    </div>
  );
};

export default Security;