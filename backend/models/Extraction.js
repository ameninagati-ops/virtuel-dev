const mongoose = require('mongoose');

const extractionSchema = new mongoose.Schema({
  file: { type: String, required: true },
  progress: { type: Number, default: 0 },
  confidence: { type: Number },
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  fields: { type: Map, of: String },
  invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }
}, { timestamps: true });

module.exports = mongoose.model('Extraction', extractionSchema);