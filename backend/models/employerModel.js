const db = require("../database/database");

const getAllEmployerData = (callback) => {
  db.all("SELECT * FROM employer_data", [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

const createEmployerData = (employerData, callback) => {
  const {
    name,
    contact_no,
    email,
    website_url,
    linkedin_url,
    high_level_requirement,
  } = employerData;

  db.run(
    `INSERT INTO employer_data (name, contact_no, email, website_url, linkedin_url, high_level_requirement) 
           VALUES (?, ?, ?, ?, ?, ?)`,
    [
      name,
      contact_no,
      email,
      website_url,
      linkedin_url,
      high_level_requirement,
    ], // Pass parameters as an array
    function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID });
      }
    }
  );
};

module.exports = { getAllEmployerData, createEmployerData };
