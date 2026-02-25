const mongoose = require('mongoose');
const User = require('./models/User');
const Threshold = require('./models/Threshold');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté');

    // Créer un utilisateur admin
    const adminExists = await User.findOne({ email: 'admin@virtualdev.com' });
    if (!adminExists) {
      await User.create({
        email: 'admin@virtualdev.com',
        password: 'admin123',
        role: 'admin',
        name: 'Administrateur'
      });
      console.log('Admin créé');
    } else {
      console.log('Admin déjà existant');
    }

    // Créer un utilisateur comptable
    const comptableExists = await User.findOne({ email: 'comptable@virtualdev.com' });
    if (!comptableExists) {
      await User.create({
        email: 'comptable@virtualdev.com',
        password: 'comptable123',
        role: 'accountant',
        name: 'Comptable'
      });
      console.log('Comptable créé');
    }

    // Créer un utilisateur finance
    const financeExists = await User.findOne({ email: 'finance@virtualdev.com' });
    if (!financeExists) {
      await User.create({
        email: 'finance@virtualdev.com',
        password: 'finance123',
        role: 'finance',
        name: 'Responsable Financier'
      });
      console.log('Finance créé');
    }

    // Créer les seuils par défaut
    const threshold = await Threshold.findOne();
    if (!threshold) {
      await Threshold.create({});
      console.log('Seuils par défaut créés');
    }

    console.log('Base de données initialisée');
    process.exit();
  } catch (error) {
    console.error('Erreur lors du seed :', error);
    process.exit(1);
  }
};

seedDatabase();