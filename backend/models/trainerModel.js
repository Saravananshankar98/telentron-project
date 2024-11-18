const db = require("../database/database");

const getAllTrainerData = (callback) => {
  db.all("SELECT * FROM trainer_data", [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

const createTrainerData = (trainerData, callback) => {
  const { name, contact_no, email, website_url, linkedin_url, expect_in } =
    trainerData;

  db.run(
    `INSERT INTO trainer_data (name, contact_no, email, website_url, linkedin_url, expect_in) 
           VALUES (?, ?, ?, ?, ?, ?)`,
    [name, contact_no, email, website_url, linkedin_url, expect_in], // Pass parameters as an array
    function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID });
      }
    }
  );
};

module.exports = { getAllTrainerData, createTrainerData };
