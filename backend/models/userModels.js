const db = require("../database/database");

const User = {
  create: (user, callback) => {
    const { username, password } = user;
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.run(query, [username, password], callback);
  },

  getAllUsers: (callback) => {
    const query = "SELECT * FROM users";
    db.all(query, [], callback);
  },

  login: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ? COLLATE NOCASE";
    db.get(query, [username], callback);
  },
};

module.exports = User;
