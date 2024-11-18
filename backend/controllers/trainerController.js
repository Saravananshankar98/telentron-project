const trainerModel = require("../models/trainerModel");

const listTrainerData = (req, res) => {
  trainerModel.getAllTrainerData((err, trainerData) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching trainer data" });
    }
    res.status(200).json(trainerData);
  });
};

const createTrainer = (req, res) => {
  trainerModel.createTrainerData(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, id: result.id });
  });
};

module.exports = { listTrainerData, createTrainer };
