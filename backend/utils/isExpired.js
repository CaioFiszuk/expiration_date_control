function isExpired(expirationDate) {
  const today = new Date().toISOString().slice(0, 10);
  return expirationDate < today;
}

module.exports = isExpired;