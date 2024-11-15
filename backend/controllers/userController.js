const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.ACCESS_TOKEN_KEY;

exports.createUser = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  User.create({ username, password: hashedPassword }, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      username,
      message: "user register successfully",
    });
  });
};

exports.listUsers = (req, res) => {
  User.getAllUsers((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.loginUsers = (req, res) => {
  const { username, password } = req.body;
  User.login(username, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined!");
      }

      if (result) {
        const token = jwt.sign(
          { id: row.id, username: row.username },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token, username, role: "admin" });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    });
  });
};
