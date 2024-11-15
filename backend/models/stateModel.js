const db = require("../database/database");

const State = {
  create: (state, callback) => {
    const { state_code, state_name } = state;
    const query = "INSERT INTO states (state_code, state_name) VALUES (?, ?)";
    db.run(query, [state_code, state_name], callback);
  },

  findAll: (callback) => {
    const query =
      "SELECT state_code, state_name FROM states ORDER BY state_name ASC";
    db.all(query, [], callback);
  },

  getByStateCode: (state_code, callback) => {
    const query =
      "SELECT state_code, state_name FROM states WHERE state_code = ?";
    db.get(query, [state_code], callback);
  },
};

module.exports = State;
