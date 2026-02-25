const express = require('express');
const { getThresholds, updateThresholds } = require('../controllers/thresholdController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getThresholds)
  .put(protect, authorize('admin'), updateThresholds);

module.exports = router;