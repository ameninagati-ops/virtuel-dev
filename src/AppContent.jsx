import React, { useContext } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthContext } from './context/AuthContext';

const AppContent = () => {
  const { user } = useContext(AuthContext);
  return !user ? <Login /> : <Dashboard />;
};

export default AppContent;