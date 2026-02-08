import React, { useContext, useState } from 'react';
import './ProductCard.css';
import './Modal.css';
import { CartContext } from '../context/CartContext';
import { RoleContext } from '../context/RoleContext';

function ProductCard({ product }) {
  const { name, price, image } = product;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({ name, price, image });
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const cartCtx = useContext(CartContext);
  const addToCart = (cartCtx && cartCtx.addToCart) || (() => {});
  const roleCtx = useContext(RoleContext) || { role: 'buyer' };
  const role = roleCtx && roleCtx.role ? roleCtx.role : 'buyer';

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const id = product._id || product.id;
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      window.dispatchEvent(new Event('products-updated'));
      setShowDeleteModal(false);
    } catch (err) {
      alert('Failed to delete product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const id = product._id || product.id;
      const payload = { 
        name: editForm.name, 
        price: Number(editForm.price),
        image: editForm.image 
      };
      const res = await fetch(`${API_BASE}/products/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      if (!res.ok) throw new Error('Update failed');
      window.dispatchEvent(new Event('products-updated'));
      setShowEditModal(false);
    } catch (err) {
      alert('Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setEditForm({ ...editForm, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setEditForm({ ...editForm, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <article className="product-card">
        <div className="product-image-wrapper">
          <img src={image} alt={name} className="product-image" />
          {role === 'seller' && (
            <div className="product-actions">
              <button className="icon-btn" title="Edit" onClick={() => { setEditForm({ name, price, image }); setShowEditModal(true); }}>✏️</button>
              <button className="icon-btn" title="Delete" onClick={() => setShowDeleteModal(true)}>🗑️</button>
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => !isLoading && setShowEditModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">✏️ Edit Product</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)} disabled={isLoading}>×</button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="edit-form">
                  <div className="form-group">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Enter product name"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Price (₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Product Image</label>
                    {editForm.image ? (
                      <div className="image-preview-container">
                        <img src={editForm.image} alt="Preview" className="image-preview" />
                      </div>
                    ) : null}
                    <div
                      className={`drag-drop-zone ${dragActive ? 'drag-active' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={handleImageDrop}
                      onClick={() => document.getElementById('edit-image-input').click()}
                    >
                      <div className="drag-drop-icon">📸</div>
                      <p className="drag-drop-text">
                        {editForm.image ? 'Click or drag to change image' : 'Click or drag image here'}
                      </p>
                    </div>
                    <input
                      id="edit-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: 'none' }}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="modal-btn btn-secondary" onClick={() => setShowEditModal(false)} disabled={isLoading}>
                  Cancel
                </button>
                <button type="submit" className="modal-btn btn-primary" disabled={isLoading}>
                  {isLoading ? <><span className="btn-spinner"></span> Saving...</> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => !isLoading && setShowDeleteModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">🗑️ Delete Product</h2>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)} disabled={isLoading}>×</button>
            </div>
            <div className="modal-body">
              <p className="confirm-message">
                Are you sure you want to delete <span className="confirm-product-name">"{name}"</span>?
                <br /><br />
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn btn-secondary" onClick={() => setShowDeleteModal(false)} disabled={isLoading}>
                Cancel
              </button>
              <button className="modal-btn btn-danger" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? <><span className="btn-spinner"></span> Deleting...</> : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
