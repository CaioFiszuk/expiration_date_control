const db = require('../database/db');

function createProduct({ title, quantity, expirationDate }) {
  const stmt = db.prepare(`
    INSERT INTO products (title, quantity, expirationDate)
    VALUES (?, ?, ?)
  `);

  const info = stmt.run(title, quantity, expirationDate);

  return {
    id: info.lastInsertRowid,
    title,
    quantity,
    expirationDate
  };
}

function updateProduct(id, { title, quantity, expirationDate }) {
  const stmt = db.prepare(`
    UPDATE products
    SET title = @title,
        quantity = @quantity,
        expirationDate = @expirationDate
    WHERE id = @id
  `);

  const result = stmt.run({
    id,
    title,
    quantity,
    expirationDate
  });

  return {
    id,
    title,
    quantity,
    expirationDate
  };
}


function deleteProduct(id) {
  const stmt = db.prepare(`DELETE FROM products WHERE id = ?`);
  const result = stmt.run(id);

  return result.changes > 0;
}

module.exports = { createProduct, updateProduct, deleteProduct };