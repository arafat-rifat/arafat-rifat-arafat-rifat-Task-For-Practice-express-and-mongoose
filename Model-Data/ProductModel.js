const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  manufacturer: String,
});

const products = mongoose.model("products", productSchema);

module.exports = products;
