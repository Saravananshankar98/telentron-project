const db = require("../database/database");

const getAllJobSeekers = (callback) => {
  db.all("SELECT * FROM jobSeeker_data", [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

const createJobSeeker = (jobSeekerData, callback) => {
  const {
    state_id,
    district_code,
    city,
    email,
    notice_period,
    expected_salary,
    resume,
  } = jobSeekerData;
  db.run(
    `
    INSERT INTO jobSeeker_data (state_id, district_code, city, email, notice_period, expected_salary, resume)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    [
      state_id,
      district_code,
      city,
      email,
      notice_period,
      expected_salary,
      resume,
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
