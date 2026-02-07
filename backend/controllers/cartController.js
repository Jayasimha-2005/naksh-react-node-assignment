const CartItem = require('../models/CartItem');

/**
 * POST /cart
 * Body: { productId, name, price, quantity }
 */
async function addToCart(req, res, next) {
  try {
    const { productId, name, price, quantity } = req.body || {};

    // Basic validation
    if (!productId || typeof productId !== 'string') {
      return res.status(400).json({ message: 'productId is required and must be a string' });
    }

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'name is required and must be a string' });
    }

    if (typeof price !== 'number' || Number.isNaN(price)) {
      return res.status(400).json({ message: 'price is required and must be a number' });
    }

    const qty = parseInt(quantity, 10);
    if (!qty || qty < 1) {
      return res.status(400).json({ message: 'quantity is required and must be a positive integer' });
    }

    const item = new CartItem({ productId, name, price, quantity: qty });
    await item.save();

    return res.status(201).json({ message: 'Added to cart', item });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  addToCart,
};
