import React from 'react';

const Users = () => {
  // Données simulées des utilisateurs
  const usersList = [
    { name: 'Administrateur', email: 'admin@virtualdev.com', role: 'admin', status: 'Actif', lastLogin: 'Maintenant' },
    { name: 'Comptable', email: 'comptable@virtualdev.com', role: 'accountant', status: 'Actif', lastLogin: 'Il y a 5 min' },
    { name: 'Responsable Financier', email: 'finance@virtualdev.com', role: 'finance', status: 'Actif', lastLogin: 'Il y a 2h' },
  ];

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-people"></i>
          Gestion des utilisateurs
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => alert('Ajout utilisateur (simulation)')}>
          <i className="bi bi-plus-lg me-2"></i>Ajouter
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Dernière connexion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="user-avatar me-2" style={{ width: '35px', height: '35px', background: index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b' }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <strong style={{ color: 'white' }}>{user.name}</strong><br />
                        <small className="text-muted">{user.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'badge-primary' : user.role === 'accountant' ? 'badge-success' : 'badge-warning'}`}>
                      {user.role === 'admin' ? 'Administrateur' : user.role === 'accountant' ? 'Comptable' : 'Finance'}
                    </span>
                  </td>
                  <td><span className="badge badge-success">Actif</span></td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-pencil"></i></button>
                    <button className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i></button>
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

export default Users;