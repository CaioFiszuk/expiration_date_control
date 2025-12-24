const Database = require('better-sqlite3');
const path = require('path');

const isTest = process.env.NODE_ENV === 'test';

const dbPath = isTest
  ? ':memory:'
  : path.resolve(__dirname, 'database.sqlite');

const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    expirationDate TEXT NOT NULL
  )
`).run();

module.exports = db;
