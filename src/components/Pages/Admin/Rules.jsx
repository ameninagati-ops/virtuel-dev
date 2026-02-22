import React from 'react';

const Rules = () => {
  const rulesList = [
    { id: 1, name: 'Montant TTC > 1000€ → vérification manuelle', status: 'active' },
    { id: 2, name: 'Fournisseur non référencé → rejet automatique', status: 'active' },
    { id: 3, name: 'Doublon détecté → blocage', status: 'test' },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <i className="bi bi-gear-wide-connected"></i> Règles de validation IA
      </div>
      <div className="card-body">
        <div className="list-group">
          {rulesList.map(rule => (
            <div key={rule.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{rule.name}</span>
              <span className={`badge ${rule.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                {rule.status === 'active' ? 'Activée' : 'En test'}
              </span>
            </div>
          ))}
        </div>
        <button className="btn btn-outline-primary mt-3" onClick={() => alert('Ajout d’une nouvelle règle (simulation)')}>
          <i className="bi bi-plus-lg"></i> Ajouter une règle
        </button>
      </div>
    </div>
  );
};

export default Rules;