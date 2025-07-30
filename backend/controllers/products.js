const db = require('../db');

function createProduct(req, res, next) {
  try {
    const { title, quantity, expirationDate } = req.body;

    const stmt = db.prepare('INSERT INTO produtos (title, quantity, expirationDate) VALUES (?, ?, ?)');
    const result = stmt.run(title, quantity, expirationDate);

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (err) {
    next(err);
  }
}

function getProducts(req, res, next) {
  try {
    const stmt = db.prepare('SELECT * FROM produtos');
    const produtos = stmt.all();

    res.status(200).json(produtos);
  } catch (err) {
    next(err);
  }
}

function deleteProduct(req, res, next) {
  try {
    const { productId } = req.params;

    const stmt = db.prepare('DELETE FROM produtos WHERE id = ?');
    const result = stmt.run(productId);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

function updateProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const { title, expirationDate, quantity } = req.body;

    const stmt = db.prepare('UPDATE produtos SET title = ?, expirationDate = ?, quantity = ? WHERE id = ?');
    const result = stmt.run(title, expirationDate, quantity, productId);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const updatedProduct = db.prepare('SELECT * FROM produtos WHERE id = ?').get(productId);

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
