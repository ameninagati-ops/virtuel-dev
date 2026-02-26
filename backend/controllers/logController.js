const db = require('../config/db');

const getLogs = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM logs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getLogs };