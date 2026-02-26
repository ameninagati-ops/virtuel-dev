const db = require('../config/db');

const getExtractions = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM extractions');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getExtractionById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM extractions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Extraction non trouvée' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getExtractions, getExtractionById };