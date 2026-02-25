const express = require('express');
const { getInvoices, createInvoice, updateStatus } = require('../controllers/invoiceController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getInvoices)
  .post(protect, authorize('accountant'), createInvoice);

router.route('/:id/status')
  .put(protect, authorize('finance', 'accountant'), updateStatus);

module.exports = router;