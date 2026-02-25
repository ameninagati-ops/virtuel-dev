const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  ref: { type: String, required: true, unique: true },
  supplier: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'urgent', 'approved', 'rejected'], default: 'pending' },
  type: { type: String, enum: ['invoice', 'expense'], default: 'invoice' },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);