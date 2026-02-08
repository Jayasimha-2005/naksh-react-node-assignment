import React, { useState, useRef } from 'react';
import './AddProduct.css';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const fileRef = useRef(null);

  const submit = async (e) => {
    e && e.preventDefault();
    
    if (!name.trim() || !price || !image) {
      setStatus({ error: 'Please fill all fields and upload an image' });
      return;
    }
    
    setStatus(null);
    setLoading(true);
    
    const payload = { name: name.trim(), price: Number(price), image: image.trim() };
    
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus({ error: body.message || 'Failed to add product' });
        setLoading(false);
        return;
      }
      
      setName(''); 
      setPrice(''); 
      setImage('');
      setStatus({ ok: '✓ Product added successfully!' });
      setLoading(false);
      window.dispatchEvent(new Event('products-updated'));
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus({ error: err.message || 'Failed to add product' });
      setLoading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setStatus({ error: 'Please upload an image file' });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setStatus({ error: 'Please upload an image file' });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Add New Product</h2>
      
      <form className="add-product-form" onSubmit={submit}>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input 
            className="form-input"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g., Gold Necklace" 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price (₹)</label>
          <input 
            className="form-input"
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="e.g., 2999" 
            type="number" 
            min="0"
            step="0.01"
            required 
          />
        </div>

        <div
          className={`image-upload-area ${dragOver ? 'drag-over' : ''}`}
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileRef.current && fileRef.current.click()}
        >
          <input 
            ref={fileRef} 
            type="file" 
            accept="image/*" 
            onChange={onFileChange} 
            style={{ display: 'none' }} 
          />
          
          {!image ? (
            <>
              <div className="upload-icon">📷</div>
              <div className="upload-text">
                {dragOver ? 'Drop image here' : 'Click or drag & drop to upload'}
              </div>
              <div className="upload-subtext">Supports: JPG, PNG, GIF</div>
            </>
          ) : (
            <>
              <img src={image} alt="Preview" className="image-preview" />
              <div className="upload-subtext" style={{ marginTop: 12 }}>
                Click to change image
              </div>
            </>
          )}
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={loading}
        >
          {loading ? '⏳ Adding Product...' : '➕ Add Product'}
        </button>

        {status && status.ok && (
          <div className="status-message success">{status.ok}</div>
        )}
        
        {status && status.error && (
          <div className="status-message error">⚠ {status.error}</div>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
