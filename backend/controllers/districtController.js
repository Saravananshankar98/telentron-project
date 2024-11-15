const Districts = require("../models/districtModel");

exports.createDistrict = (req, res) => {
  const { district_code, district_name, state_code } = req.body;
  Districts.createDistrict(
    { district_code, district_name, state_code },
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "District created successfully" });
    }
  );
};

exports.listDistricts = (req, res) => {
  Districts.getAllDistricts((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getDistrictsByState = (req, res) => {
  const { state_code } = req.params;
  Districts.getStateCodeDistricts(state_code, (err, districts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (districts.length === 0) {
      return res
        .status(404)
        .json({ message: "No districts found for this state code" });
    }
    res.status(200).json({ districts });
  });
};
