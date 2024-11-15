const db = require("../database/database");

const TrainingSessions = {
  create: (userDetails, callback) => {
    const { full_name, mail_id } = userDetails;
    const query =
      "INSERT INTO training_sessions  (full_name, mail_id) VALUES (?, ?)";
    db.run(query, [full_name, mail_id], callback);
  },
};

module.exports = TrainingSessions;
