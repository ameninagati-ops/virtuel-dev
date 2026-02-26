require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import des contrôleurs (on les garde pour les autres routes)
const { login } = require('./controllers/authController');
const { getInvoices, createInvoice, updateStatus } = require('./controllers/invoiceController');
const { getExtractions, getExtractionById } = require('./controllers/extractionController');
const { getThresholds, updateThresholds } = require('./controllers/thresholdController');
const { getUsers, createUser, updateUser, deleteUser } = require('./controllers/userController');
const { getLogs } = require('./controllers/logController');
const { protect, authorize } = require('./middleware/authMiddleware');

// Routes existantes
app.post('/api/auth/login', login);
app.get('/api/invoices', protect, getInvoices);
app.put('/api/invoices/:id/status', protect, updateStatus);
app.get('/api/extractions', protect, getExtractions);
app.get('/api/extractions/:id', protect, getExtractionById);
app.get('/api/thresholds', protect, getThresholds);
app.put('/api/thresholds', protect, updateThresholds);
app.route('/api/users')
  .get(protect, authorize('admin'), getUsers)
  .post(protect, authorize('admin'), createUser);
app.route('/api/users/:id')
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);
app.get('/api/logs', protect, authorize('admin'), getLogs);

// ---------- CONFIGURATION DE L'UPLOAD AVEC MULTER ----------
// Créer le dossier uploads s'il n'existe pas
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'file-' + uniqueSuffix + ext);
  }
});

// Filtre pour n'accepter que certains types de fichiers
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|png|jpg|jpeg|xml/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  if (allowedTypes.test(ext) && 
      (mime.startsWith('image/') || mime === 'application/pdf' || mime.includes('xml'))) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 Mo
  fileFilter: fileFilter
}).array('files', 10); // jusqu'à 10 fichiers

// Route d'upload
app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Aucun fichier sélectionné' });
    }
    // Ici tu pourrais enregistrer les fichiers dans la table extractions si besoin
    const filesInfo = req.files.map(f => ({
      originalName: f.originalname,
      savedName: f.filename,
      size: f.size,
      path: f.path
    }));
    res.json({ 
      message: `${req.files.length} fichier(s) uploadé(s) avec succès`,
      files: filesInfo 
    });
  });
});

// Servir les fichiers uploadés (optionnel)
app.use('/uploads', express.static('uploads'));
// ---------- FIN CONFIGURATION UPLOAD ----------

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});