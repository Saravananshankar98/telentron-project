const db = require("../database/database");

const District = {
  createDistrict: (district, callback) => {
    const { district_code, district_name, state_code } = district;
    const query = `
        INSERT INTO districts (district_code, district_name, state_code)
        VALUES (?, ?, ?)
      `;
    db.run(query, [district_code, district_name, state_code], callback);
  },

  getAllDistricts: (callback) => {
    const query = "SELECT * FROM districts";
    db.all(query, [], callback);
  },

  getStateCodeDistricts: (state_code, callback) => {
    const query = `
      SELECT district_code, district_name, state_code
      FROM districts
      WHERE state_code = ?
    `;
    db.all(query, [state_code], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },
};

module.exports = District;
