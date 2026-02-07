const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
