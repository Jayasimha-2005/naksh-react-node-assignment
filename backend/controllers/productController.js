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

module.exports = {
  getProducts,
};
