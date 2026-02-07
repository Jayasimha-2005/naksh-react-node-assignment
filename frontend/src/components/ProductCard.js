import React, { useContext } from 'react';
import './ProductCard.css';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {
  const { name, price, image } = product;
  const { addToCart } = useContext(CartContext);

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-body">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">₹{price}</p>
        <button
          className="add-to-cart"
          type="button"
          onClick={() => addToCart({ id: product.id, name, price })}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
