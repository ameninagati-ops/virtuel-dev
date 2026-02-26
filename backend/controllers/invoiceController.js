const db = require('../config/db');

const getInvoices = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT i.*, u.name as submitted_by_name
      FROM invoices i
      LEFT JOIN users u ON i.submitted_by = u.id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createInvoice = async (req, res) => {
  const { ref, supplier, amount, date, type } = req.body;
  try {
    const result = await db.query(`
      INSERT INTO invoices (ref, supplier, amount, date, type, submitted_by)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [ref, supplier, amount, date, type, req.user.id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const result = await db.query(
      'UPDATE invoices SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }
    // Ajouter un log
    await db.query(
      'INSERT INTO logs (user_id, action, details) VALUES ($1, $2, $3)',
      [req.user.id, 'Mise à jour statut', `Facture ${req.params.id} passée à ${status}`]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getInvoices, createInvoice, updateStatus };