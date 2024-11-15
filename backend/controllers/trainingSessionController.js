const TrainingSessions = require("../models/trainingSessionsModel");

exports.CreateTrainingSessions = (req, res) => {
  const { full_name, mail_id } = req.body;
  TrainingSessions.create({ full_name, mail_id }, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Training Sessions Created successfully" });
  });
};
