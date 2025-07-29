const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.resolve(__dirname, 'banco.db'), { verbose: console.log });

db.prepare(`CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  expirationDate TEXT NOT NULL
)`).run();

module.exports = db;
