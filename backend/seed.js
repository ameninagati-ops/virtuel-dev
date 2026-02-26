require('dotenv').config();
const db = require('./config/db');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    const adminPass = await bcrypt.hash('admin123', 10);
    const comptablePass = await bcrypt.hash('comptable123', 10);
    const financePass = await bcrypt.hash('finance123', 10);

    await db.query(`
      INSERT INTO users (email, password, role, name) VALUES
      ($1, $2, 'admin', 'Administrateur'),
      ($3, $4, 'accountant', 'Comptable'),
      ($5, $6, 'finance', 'Responsable Financier')
      ON CONFLICT (email) DO NOTHING
    `, ['admin@virtualdev.com', adminPass, 'comptable@virtualdev.com', comptablePass, 'finance@virtualdev.com', financePass]);

    await db.query(`
      INSERT INTO thresholds (ocr_confidence, auto_validation_amount, required_validation_amount)
      VALUES (85, 1000, 5000)
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Seed terminé');
  } catch (error) {
    console.error('❌ Erreur seed :', error);
  } finally {
    await db.close();
    process.exit();
  }
}

seed();