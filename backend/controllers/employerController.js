const employerModel = require("../models/employerModel");

const listEmployerData = (req, res) => {
  employerModel.getAllEmployerData((err, employerData) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching trainer data" });
    }
    res.status(200).json(employerData);
  });
};

const createEmployerData = (req, res) => {
  employerModel.createEmployerData(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, id: result.id });
  });
};

module.exports = { listEmployerData, createEmployerData };
