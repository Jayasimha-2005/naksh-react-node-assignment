const Product = require('../models/Product');

/**
 * GET /products
 * Returns all products
 */
async function getProducts(req, res, next) {
  try {
    const products = await Product.find({}).lean().exec();
    return res.json(products);
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /products
 * Create a new product (used by sellers)
 */
async function createProduct(req, res, next) {
  try {
    const { name, price, image } = req.body || {};
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'name is required' });
    }
    if (typeof price !== 'number' || Number.isNaN(price)) {
      return res.status(400).json({ message: 'price is required and must be a number' });
    }

    const product = new Product({ name: name.trim(), price, image: image || '' });
    await product.save();
    return res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    return next(err);
  }
}

/**
 * PUT /products/:id
 * Update product
 */
async function updateProduct(req, res, next) {
  try {
    const id = req.params.id;
    const { name, price, image } = req.body || {};
    const update = {};
    if (name) update.name = name;
    if (typeof price === 'number' && !Number.isNaN(price)) update.price = price;
    if (image !== undefined) update.image = image;

    const product = await Product.findByIdAndUpdate(id, update, { new: true }).exec();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json({ message: 'Updated', product });
  } catch (err) {
    return next(err);
  }
}

/**
 * DELETE /products/:id
 */
async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).exec();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.deleteOne();
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
