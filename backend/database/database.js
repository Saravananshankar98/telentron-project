const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./state.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Database opening error: ", err);
  } else {
    console.log("Database connected");

    // Set busyTimeout to 5000 milliseconds (5 seconds)
    db.configure("busyTimeout", 1000);

    // Enable WAL (Write-Ahead Logging) mode for better concurrency
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
    username TEXT NOT NULL,
    password TEXT NOT NULL
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
      full_name TEXT NOT NULL,
      mail_id TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS jobSeeker_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      state_id TEXT NOT NULL,
      district_code TEXT NOT NULL,
      city TEXT NOT NULL,
      name TEXT NOT NULL,
      contact_no INTEGER NOT NULL,
      email TEXT NOT NULL,
      notice_period TEXT NOT NULL,
      expected_salary TEXT NOT NULL,
      resume BLOB,
      FOREIGN KEY (state_id) REFERENCES states(state_code),
      FOREIGN KEY (district_code) REFERENCES districts(district_code)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS trainer_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      contact_no TEXT NOT NULL,
      email TEXT NOT NULL,
      website_url TEXT,
      linkedin_url TEXT NOT NULL,
      expect_in TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS employer_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      contact_no TEXT NOT NULL,
      email TEXT NOT NULL,
      website_url TEXT NOT NULL,
      linkedin_url TEXT,
      high_level_requirement TEXT
    );
  `);
});

module.exports = db;
