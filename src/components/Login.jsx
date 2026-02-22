import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { users } from '../data/mockData';

const Login = () => {
  const [email, setEmail] = useState('admin@virtualdev.com');
  const [password, setPassword] = useState('admin123');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users[email] && users[email].pass === password) {
      login(users[email]);
    } else {
      alert('Identifiants incorrects');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>VIRTUAL DEV</h1>
          <p>Plateforme d'automatisation P2P basée sur l'IA</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@virtualdev.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email professionnel</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <button type="submit" className="btn-login">
            <i className="bi bi-box-arrow-in-right me-2"></i>Se connecter
          </button>
        </form>
        <div className="mt-4 p-3" style={{ background: '#0b1a33', borderRadius: '16px', border: '1px solid #1e3a5f' }}>
          <p className="small mb-0" style={{ color: '#cbd5e1' }}>
            <i className="bi bi-info-circle me-2" style={{ color: '#3b82f6' }}></i>
            Identifiants : admin@virtualdev.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;