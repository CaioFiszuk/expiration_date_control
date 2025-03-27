const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    min: 0,
    required: true
  },
  expirationDate: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('product', productSchema);