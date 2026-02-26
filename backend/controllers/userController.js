const db = require('../config/db');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT id, email, role, name FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createUser = async (req, res) => {
  const { email, password, role, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (email, password, role, name) VALUES ($1, $2, $3, $4) RETURNING id, email, role, name',
      [email, hashedPassword, role, name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, role, name } = req.body;
  try {
    let query = 'UPDATE users SET email = $1, role = $2, name = $3';
    const params = [email, role, name];
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      query += ', password = $4 WHERE id = $5 RETURNING id, email, role, name';
      params.push(hashed, id);
    } else {
      query += ' WHERE id = $4 RETURNING id, email, role, name';
      params.push(id);
    }
    const result = await db.query(query, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };