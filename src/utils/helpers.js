export const getPageTitle = (page) => {
  const titles = {
    thresholds: 'Seuils IA',
    users: 'Utilisateurs',
    rules: 'Règles IA',
    logs: 'Journaux',
    security: 'Sécurité',
    import: 'Import/Scan',
    extractions: 'Extractions IA',
    pending: 'En attente',
    to_validate: 'À valider',
    validated: 'Validées',
    rejected: 'Rejetées',
    dashboard: 'Dashboard',
    validations: 'Validations',
    history: 'Historique',
    reports: 'Rapports',
    statistics: 'Statistiques'
  };
  return titles[page] || page;
};