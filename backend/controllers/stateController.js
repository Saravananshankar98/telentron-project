const State = require("../models/stateModel");

exports.createState = (req, res) => {
  const { state_code, state_name } = req.body;
  State.create({ state_code, state_name }, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "State created successfully" });
  });
};

exports.getStates = (req, res) => {
  State.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getByStateCode = (req, res) => {
  const { state_code } = req.params;
  State.getByStateCode(state_code, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "State not found" });
    res.json(row);
  });
};
