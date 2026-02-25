const Invoice = require('../models/Invoice');

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('submittedBy', 'name email');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice({ ...req.body, submittedBy: req.user._id });
    const created = await invoice.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Facture non trouvée' });
    invoice.status = status;
    await invoice.save();
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getInvoices, createInvoice, updateStatus };