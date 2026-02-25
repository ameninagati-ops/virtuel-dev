const mongoose = require('mongoose');

const thresholdSchema = new mongoose.Schema({
  ocrConfidence: { type: Number, default: 85 },
  autoValidationAmount: { type: Number, default: 1000 },
  requiredValidationAmount: { type: Number, default: 5000 }
}, { timestamps: true });

module.exports = mongoose.model('Threshold', thresholdSchema);