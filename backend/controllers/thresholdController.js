const Threshold = require('../models/Threshold');

const getThresholds = async (req, res) => {
  try {
    let thresholds = await Threshold.findOne();
    if (!thresholds) {
      thresholds = await Threshold.create({});
    }
    res.json(thresholds);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateThresholds = async (req, res) => {
  try {
    let thresholds = await Threshold.findOne();
    if (!thresholds) {
      thresholds = new Threshold(req.body);
    } else {
      thresholds = await Threshold.findOneAndUpdate({}, req.body, { new: true });
    }
    await thresholds.save();
    res.json(thresholds);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getThresholds, updateThresholds };