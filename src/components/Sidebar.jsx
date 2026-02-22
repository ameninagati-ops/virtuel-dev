import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ role, currentPage, setCurrentPage }) => {
  const { logout } = useContext(AuthContext);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    logout();
  };

  const renderMenu = () => {
    if (role === 'admin') {
      return (
        <>
          <div className="nav-section-title">ADMINISTRATION</div>
          <div className="nav-item">
            <button
              className={`nav-link ${currentPage === 'thresholds' ? 'active' : ''}`}
              onClick={() => handleClick('thresholds')}
            >
              <i className="bi bi-sliders2"></i><span>Seuils IA</span>
            </button>
          </div>
          <div className="nav-item">
            <button
              className={`nav-link ${currentPage === 'users' ? 'active' : ''}`}
              onClick={() => handleClick('users')}
            >
              <i className="bi bi-people"></i><span>Utilisateurs</span>
            </button>
          </div>
          <div className="nav-item">
            <button
              className={`nav-link ${currentPage === 'rules' ? 'active' : ''}`}
              onClick={() => handleClick('rules')}
            >
              <i className="bi bi-gear-wide-connected"></i><span>Règles IA</span>
            </button>
          </div>
          <div className="nav-section">
            <div className="nav-section-title">SYSTÈME</div>
            <div className="nav-item">
              <button
                className={`nav-link ${currentPage === 'logs' ? 'active' : ''}`}
                onClick={() => handleClick('logs')}
              >
                <i className="bi bi-journal-text"></i><span>Journaux</span>
              </button>
            </div>
            <div className="nav-item">
              <button
                className={`nav-link ${currentPage === 'security' ? 'active' : ''}`}
                onClick={() => handleClick('security')}
              >
                <i className="bi bi-shield-check"></i><span>Sécurité</span>
              </button>
            </div>
          </div>
        </>
      );
    } else if (role === 'accountant') {
      return (
        <>
          <div className="nav-section-title">COMPTABILITÉ</div>
          <div className="nav-item">
            <button
              className={`nav-link ${currentPage === 'import' ? 'active' : ''}`}
              onClick={() => handleClick('import')}
            >
              <i className="bi bi-cloud-upload"></i><span>Import/Scan</span>
            </button>
          </div>
          <div className="nav-item">
            <button
              className={`nav-link ${currentPage === 'extractions' ? 'active' : ''}`}
              onClick={() => handleClick('extractions')}
            >
              <i className="bi bi-cpu"></i><span>Extractions IA</span>
            </button>
          </div>
          <div className="nav-item">
            <button
              className={`nav-link ${currentPage === 'pending' ? 'active' : ''}`}
              onClick={() => handleClick('pending')}
            >
              <i className="bi bi-clock-history"></i><span>En attente</span>
            </button>
          </div>
          <div className="nav-section">
            <div className="nav-section-title">VALIDATIONS</div>
            <div className="nav-item">
              <button
                className={`nav-link ${currentPage === 'to_validate' ? 'active' : ''}`}
                onClick={() => handleClick('to_validate')}
              >
                <i className="bi bi-check2-circle"></i><span>À valider</span>
              </button>
            </div>
            <div className="nav-item">
              <button
                className={`nav-link ${currentPage === 'validated' ? 'active' : ''}`}
                onClick={() => handleClick('validated')}
              >
                <i className="bi bi-check2-all"></i><span>Validées</span>
              </button>
            </div>
            <div className="nav-item">
              <button
                className={`nav-link ${currentPage === 'rejected' ? 'active' : ''}`}
                onClick={() => handleClick('rejected')}
              >
                <i className="bi bi-x-circle"></i><span>Rejetées</span>
              </button>
            </div>
          </div>
        </>
      );
    } else {
      // Finance
      return (
        <>
          <div className="nav-section-title">FINANCES</div>
          <div className="nav-item">
            <button
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleClick('dashboard')}
            >
              <i className="bi bi-speedometer2"></i><span>Dashboard</span>
            </button>
          </div>
          <div className="nav-item">
            <button
              className={`nav-link ${currentPage === 'validations' ? 'active' : ''}`}
              onClick={() => handleClick('validations')}
            >
              <i className="bi bi-check2-square"></i><span>Validations</span>
            </button>
          </div>
          <div className="nav-item">
            <button
              className={`nav-link ${currentPage === 'history' ? 'active' : ''}`}
              onClick={() => handleClick('history')}
            >
              <i className="bi bi-clock-history"></i><span>Historique</span>
            </button>
          </div>
          <div className="nav-section">
            <div className="nav-section-title">RAPPORTS</div>
            <div className="nav-item">
              <button
                className={`nav-link ${currentPage === 'reports' ? 'active' : ''}`}
                onClick={() => handleClick('reports')}
              >
                <i className="bi bi-file-earmark-text"></i><span>Rapports</span>
              </button>
            </div>
            <div className="nav-item">
              <button
                className={`nav-link ${currentPage === 'statistics' ? 'active' : ''}`}
                onClick={() => handleClick('statistics')}
              >
                <i className="bi bi-graph-up"></i><span>Statistiques</span>
              </button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>V-DEV</h3>
        <p>Intelligence Artificielle P2P</p>
      </div>
      <div className="nav-menu">
        {renderMenu()}
      </div>
      <div className="p-3">
        <button onClick={handleLogout} className="logout-btn">
          <i className="bi bi-box-arrow-right"></i> Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;