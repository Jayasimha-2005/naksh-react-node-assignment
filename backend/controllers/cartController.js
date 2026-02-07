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

/**
 * GET /cart
 * Returns all cart items
 */
async function getCartItems(req, res, next) {
  try {
    const items = await CartItem.find({}).lean().exec();
    return res.json(items);
  } catch (err) {
    return next(err);
  }
}

/**
 * PUT /cart/:id
 * Update quantity of a cart item
 */
async function updateCartItem(req, res, next) {
  try {
    const id = req.params.id;
    const { quantity } = req.body || {};

    const qty = parseInt(quantity, 10);
    if (!qty || qty < 1) {
      return res.status(400).json({ message: 'quantity is required and must be a positive integer' });
    }

    const item = await CartItem.findById(id).exec();
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    item.quantity = qty;
    await item.save();

    return res.json({ message: 'Updated', item });
  } catch (err) {
    return next(err);
  }
}

/**
 * DELETE /cart/:id
 * Remove item from cart
 */
async function deleteCartItem(req, res, next) {
  try {
    const id = req.params.id;
    const item = await CartItem.findById(id).exec();
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    await item.deleteOne();
    return res.json({ message: 'Removed' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  addToCart,
};
