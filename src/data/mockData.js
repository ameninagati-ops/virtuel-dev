// Données simulées

export const users = {
    'admin@virtualdev.com': { pass: 'admin123', role: 'admin', name: 'Administrateur' },
    'comptable@virtualdev.com': { pass: 'comptable123', role: 'accountant', name: 'Comptable' },
    'finance@virtualdev.com': { pass: 'finance123', role: 'finance', name: 'Responsable Financier' }
};

export let invoices = [
    { id: 1, ref: 'FAC-2026-089', supplier: 'Fournitures Pro', amount: 12450, date: '2026-03-15', status: 'pending', type: 'invoice', submittedBy: 'Comptable' },
    { id: 2, ref: 'FAC-2026-092', supplier: 'Services Informatiques', amount: 8320, date: '2026-03-16', status: 'pending', type: 'invoice', submittedBy: 'Comptable' },
    { id: 3, ref: 'FAC-2026-095', supplier: 'Équipements Bureau', amount: 15780, date: '2026-03-17', status: 'urgent', type: 'invoice', submittedBy: 'Comptable' },
    { id: 4, ref: 'NDF-2026-023', supplier: 'Déplacements', amount: 450, date: '2026-03-18', status: 'pending', type: 'expense', submittedBy: 'Marketing' },
    { id: 5, ref: 'NDF-2026-024', supplier: 'Restaurants', amount: 230, date: '2026-03-18', status: 'approved', type: 'expense', submittedBy: 'Ventes' },
    { id: 6, ref: 'FAC-2026-101', supplier: 'Informatique Plus', amount: 5600, date: '2026-03-19', status: 'rejected', type: 'invoice', submittedBy: 'Comptable' }
];

export let extractions = [
    { id: 1, file: 'FAC_2026_001.pdf', progress: 65, confidence: 65, status: 'in_progress', date: '2026-03-18', fields: { montant: '12 450 €', fournisseur: 'Fournitures Pro', date: '15/03/2026' } },
    { id: 2, file: 'FACTURE_2026_045.png', progress: 100, confidence: 98, status: 'completed', date: '2026-03-17', fields: { montant: '8 320 €', fournisseur: 'Services Informatiques', date: '16/03/2026' } },
    { id: 3, file: 'FAC_2026_002.pdf', progress: 30, confidence: 30, status: 'in_progress', date: '2026-03-18', fields: {} },
    { id: 4, file: 'FACTURE_2026_046.pdf', progress: 100, confidence: 95, status: 'completed', date: '2026-03-16', fields: { montant: '15 780 €', fournisseur: 'Équipements Bureau', date: '17/03/2026' } }
];

export let thresholds = {
    ocrConfidence: 85,
    autoValidationAmount: 1000,
    requiredValidationAmount: 5000
};

export let actionsLog = [
    { timestamp: new Date().toISOString(), user: 'admin@virtualdev.com', action: 'Connexion', details: 'Administrateur' }
];