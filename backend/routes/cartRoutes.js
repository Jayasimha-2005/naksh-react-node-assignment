const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, updateCartItem, deleteCartItem } = require('../controllers/cartController');

router.get('/', getCartItems);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

module.exports = router;
