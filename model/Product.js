// model/Product.js
const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  hex:   { type: String, required: true },
  image: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, enum: ['Sports', 'Casual', 'Formal'], required: true },
  size:        { type: String },
  description: { type: String },
  colors:      [colorSchema],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);