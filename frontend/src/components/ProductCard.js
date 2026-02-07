import React, { useContext } from 'react';
import './ProductCard.css';
import { CartContext } from '../context/CartContext';
import { RoleContext } from '../context/RoleContext';

function ProductCard({ product }) {
  const { name, price, image } = product;
  // useContext can be null during hot-reload if provider momentarily unmounts.
  // Guard access to avoid destructuring null directly.
  const cartCtx = useContext(CartContext);
  const addToCart = (cartCtx && cartCtx.addToCart) || (() => {});
  const roleCtx = useContext(RoleContext) || { role: 'buyer' };
  const role = roleCtx && roleCtx.role ? roleCtx.role : 'buyer';

  const handleDelete = async () => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const id = product._id || product.id;
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      window.dispatchEvent(new Event('products-updated'));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleEdit = async () => {
    const newName = window.prompt('Name', name);
    if (newName == null) return;
    const newPrice = window.prompt('Price', String(price));
    if (newPrice == null) return;
    const newImage = window.prompt('Image URL or data URL (leave empty to keep)', image || '');
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const id = product._id || product.id;
      const payload = { name: newName, price: Number(newPrice) };
      if (newImage) payload.image = newImage;
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Update failed');
      window.dispatchEvent(new Event('products-updated'));
    } catch (err) {
      alert('Failed to update');
    }
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-image" />
        {role === 'seller' && (
          <div className="product-actions">
            <button className="icon-btn" title="Edit" onClick={handleEdit}>✏️</button>
            <button className="icon-btn" title="Delete" onClick={handleDelete}>🗑️</button>
          </div>
        )}
      </div>
      <div className="product-body">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">₹{price}</p>
        <button className="add-to-cart" type="button" onClick={() => addToCart({ id: product.id || product._id, name, price })}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
