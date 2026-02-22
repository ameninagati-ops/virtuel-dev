import React, { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import ContentHeader from './ContentHeader';
import { AuthContext } from '../context/AuthContext';
import { getPageTitle } from '../utils/helpers';

// Admin
import Thresholds from './Pages/Admin/Thresholds';
import Users from './Pages/Admin/Users';
import Rules from './Pages/Admin/Rules';
import Logs from './Pages/Admin/Logs';
import Security from './Pages/Admin/Security';

// Accountant
import Import from './Pages/Accountant/Import';
import Extractions from './Pages/Accountant/Extractions';
import Pending from './Pages/Accountant/Pending';
import ToValidate from './Pages/Accountant/ToValidate';
import Validated from './Pages/Accountant/Validated';
import Rejected from './Pages/Accountant/Rejected';

// Finance
import FinanceDashboard from './Pages/Finance/Dashboard';
import Validations from './Pages/Finance/Validations';
import History from './Pages/Finance/History';
import Reports from './Pages/Finance/Reports';
import Statistics from './Pages/Finance/Statistics';

const PlaceholderPage = ({ page }) => (
  <div className="card">
    <div className="card-header">Page {page}</div>
    <div className="card-body">
      <p className="text-muted">Contenu de la page {page} (en construction)</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(
    user.role === 'admin' ? 'thresholds' : user.role === 'accountant' ? 'import' : 'dashboard'
  );

  const renderContent = () => {
    if (user.role === 'admin') {
      switch (currentPage) {
        case 'thresholds': return <Thresholds />;
        case 'users': return <Users />;
        case 'rules': return <Rules />;
        case 'logs': return <Logs />;
        case 'security': return <Security />;
        default: return <PlaceholderPage page={currentPage} />;
      }
    } else if (user.role === 'accountant') {
      switch (currentPage) {
        case 'import': return <Import />;
        case 'extractions': return <Extractions />;
        case 'pending': return <Pending />;
        case 'to_validate': return <ToValidate />;
        case 'validated': return <Validated />;
        case 'rejected': return <Rejected />;
        default: return <PlaceholderPage page={currentPage} />;
      }
    } else {
      switch (currentPage) {
        case 'dashboard': return <FinanceDashboard />;
        case 'validations': return <Validations />;
        case 'history': return <History />;
        case 'reports': return <Reports />;
        case 'statistics': return <Statistics />;
        default: return <PlaceholderPage page={currentPage} />;
      }
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar role={user.role} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        <ContentHeader title={user.name} pageTitle={getPageTitle(currentPage)} />
        <div className="animate-slide">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;