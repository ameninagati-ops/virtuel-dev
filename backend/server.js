const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Données mockées
let mockUsers = [
  { id: 1, email: 'admin@virtualdev.com', password: 'admin123', role: 'admin', name: 'Administrateur' },
  { id: 2, email: 'comptable@virtualdev.com', password: 'comptable123', role: 'accountant', name: 'Comptable' },
  { id: 3, email: 'finance@virtualdev.com', password: 'finance123', role: 'finance', name: 'Responsable Financier' }
];

let mockInvoices = [
  { id: 1, ref: 'FAC-2026-089', supplier: 'Fournitures Pro', amount: 12450, date: '2026-03-15', status: 'pending', type: 'invoice', submittedBy: 2 },
  { id: 2, ref: 'FAC-2026-092', supplier: 'Services Informatiques', amount: 8320, date: '2026-03-16', status: 'pending', type: 'invoice', submittedBy: 2 },
  { id: 3, ref: 'FAC-2026-095', supplier: 'Équipements Bureau', amount: 15780, date: '2026-03-17', status: 'urgent', type: 'invoice', submittedBy: 2 },
  { id: 4, ref: 'NDF-2026-023', supplier: 'Déplacements', amount: 450, date: '2026-03-18', status: 'pending', type: 'expense', submittedBy: 3 },
  { id: 5, ref: 'NDF-2026-024', supplier: 'Restaurants', amount: 230, date: '2026-03-18', status: 'approved', type: 'expense', submittedBy: 3 },
  { id: 6, ref: 'FAC-2026-101', supplier: 'Informatique Plus', amount: 5600, date: '2026-03-19', status: 'rejected', type: 'invoice', submittedBy: 2 }
];

let mockExtractions = [
  { id: 1, file: 'FAC_2026_001.pdf', progress: 65, confidence: 65, status: 'in_progress', fields: {} },
  { id: 2, file: 'FACTURE_2026_045.png', progress: 100, confidence: 98, status: 'completed', fields: { montant: '8 320 €', fournisseur: 'Services Informatiques', date: '16/03/2026' } },
  { id: 3, file: 'FAC_2026_002.pdf', progress: 30, confidence: 30, status: 'in_progress', fields: {} },
  { id: 4, file: 'FACTURE_2026_046.pdf', progress: 100, confidence: 95, status: 'completed', fields: { montant: '15 780 €', fournisseur: 'Équipements Bureau', date: '17/03/2026' } }
];

let mockThresholds = {
  ocrConfidence: 85,
  autoValidationAmount: 1000,
  requiredValidationAmount: 5000
};

let mockLogs = [
  { id: 1, user: 1, action: 'Connexion', details: 'Administrateur connecté', timestamp: new Date().toISOString() }
];

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }
});

// Invoices
app.get('/api/invoices', (req, res) => {
  res.json(mockInvoices);
});

app.put('/api/invoices/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const invoice = mockInvoices.find(inv => inv.id == id);
  if (!invoice) {
    return res.status(404).json({ message: 'Facture non trouvée' });
  }
  invoice.status = status;
  res.json(invoice);
});

// Extractions
app.get('/api/extractions', (req, res) => {
  res.json(mockExtractions);
});

// Thresholds
app.get('/api/thresholds', (req, res) => {
  res.json(mockThresholds);
});

app.put('/api/thresholds', (req, res) => {
  mockThresholds = { ...mockThresholds, ...req.body };
  res.json(mockThresholds);
});

// Users
app.get('/api/users', (req, res) => {
  const usersWithoutPass = mockUsers.map(({ password, ...user }) => user);
  res.json(usersWithoutPass);
});

app.post('/api/users', (req, res) => {
  const newUser = { id: mockUsers.length + 1, ...req.body };
  mockUsers.push(newUser);
  const { password, ...userWithoutPass } = newUser;
  res.status(201).json(userWithoutPass);
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const index = mockUsers.findIndex(u => u.id == id);
  if (index === -1) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  mockUsers[index] = { ...mockUsers[index], ...req.body };
  const { password, ...userWithoutPass } = mockUsers[index];
  res.json(userWithoutPass);
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const index = mockUsers.findIndex(u => u.id == id);
  if (index === -1) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  mockUsers.splice(index, 1);
  res.json({ message: 'Utilisateur supprimé' });
});

// Logs
app.get('/api/logs', (req, res) => {
  res.json(mockLogs);
});

// Upload (simulé)
app.post('/api/upload', (req, res) => {
  res.json({ message: 'Fichiers uploadés avec succès (simulation)' });
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});