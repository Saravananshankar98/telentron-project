const db = require("../database/database");
const getAllJobSeekers = (callback) => {
  db.all("SELECT * FROM jobSeeker_data", [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      rows.forEach((row) => {
        callback(null, rows);
      });
    }
  });
};

const createJobSeeker = (jobSeekerData, file, callback) => {
  const {
    state_id,
    district_code,
    city,
    email,
    notice_period,
    expected_salary,
    name,
    contact_no,
  } = jobSeekerData;

  db.run(
    `
      INSERT INTO jobSeeker_data (state_id, district_code, city, email, notice_period, expected_salary, resume, name, contact_no)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    [
      state_id,
      district_code,
      city,
      email,
      notice_period,
      expected_salary,
      file,
      name,
      contact_no,
    ],
    function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID });
      }
    }
  );
};

module.exports = { getAllJobSeekers, createJobSeeker };
