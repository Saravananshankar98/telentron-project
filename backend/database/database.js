const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./state.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Database opening error: ", err);
  } else {
    console.log("Database connected");

    db.configure("busyTimeout", 1000);

    db.run("PRAGMA journal_mode=WAL;", (err) => {
      if (err) {
        console.error("Error setting WAL mode: ", err);
      } else {
        console.log("WAL mode enabled");
      }
    });
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL CHECK (username != ''),
    password TEXT NOT NULL CHECK (password != '')
  )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS states (
      state_code TEXT PRIMARY KEY NOT NULL,
      state_name TEXT NOT NULL UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS districts (
      district_code TEXT PRIMARY KEY,
      district_name TEXT NOT NULL,
      state_code TEXT,
      FOREIGN KEY (state_code) REFERENCES states(state_code)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS training_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL CHECK (full_name != ''),
      mail_id TEXT NOT NULL CHECK (mail_id != '')
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS jobSeeker_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      state_id TEXT NOT NULL CHECK (state_id != ''),
      district_code TEXT NOT NULL CHECK (district_code != ''),
      city TEXT NOT NULL CHECK (city != ''),
      name TEXT NOT NULL CHECK (name != ''),
      contact_no INTEGER NOT NULL CHECK (contact_no != ''),
      email TEXT NOT NULL CHECK (email != ''),
      notice_period TEXT NOT NULL CHECK (notice_period != ''),
      expected_salary TEXT NOT NULL CHECK (expected_salary != ''),
      resume BLOB,
      FOREIGN KEY (state_id) REFERENCES states(state_code),
      FOREIGN KEY (district_code) REFERENCES districts(district_code)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS trainer_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL CHECK (name != ''),
      contact_no TEXT NOT NULL CHECK (contact_no != ''),
      email TEXT NOT NULL CHECK (email != ''),
      website_url TEXT,
      linkedin_url TEXT NOT NULL CHECK (linkedin_url != ''),
      expect_in TEXT NOT NULL CHECK (expect_in != '')
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS employer_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL CHECK (name != ''),
      contact_no TEXT NOT NULL CHECK (contact_no != ''),
      email TEXT NOT NULL CHECK (email != ''),
      website_url TEXT NOT NULL CHECK (website_url != ''),
      linkedin_url TEXT,
      high_level_requirement TEXT CHECK (high_level_requirement != '')
    );
  `);
});

module.exports = db;
