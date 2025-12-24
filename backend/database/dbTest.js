const Database = require('better-sqlite3');

const db = new Database(':memory:');

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    expirationDate TEXT NOT NULL
  )
`).run();

module.exports = db;
