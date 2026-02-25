const API_BASE = 'http://localhost:5000/api';

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur de connexion');
  }
  return response.json();
};

export const fetchInvoices = async () => {
  const response = await fetch(`${API_BASE}/invoices`);
  return response.json();
};

export const updateInvoiceStatus = async (id, status) => {
  const response = await fetch(`${API_BASE}/invoices/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur mise à jour');
  }
  return response.json();
};

export const fetchExtractions = async () => {
  const response = await fetch(`${API_BASE}/extractions`);
  return response.json();
};

export const fetchThresholds = async () => {
  const response = await fetch(`${API_BASE}/thresholds`);
  return response.json();
};

export const updateThresholds = async (data) => {
  const response = await fetch(`${API_BASE}/thresholds`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE}/users`);
  return response.json();
};

export const addUser = async (userData) => {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur ajout utilisateur');
  }
  return response.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

export const fetchLogs = async () => {
  const response = await fetch(`${API_BASE}/logs`);
  return response.json();
};

export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData
  });
  return response.json();
};