import React, { useState, useRef } from 'react';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const fileRef = useRef(null);

  const submit = async (e) => {
    e && e.preventDefault();
    setStatus(null);
    const payload = { name: name.trim(), price: Number(price), image: image.trim() };
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus({ error: body.message || 'Failed' });
        return;
      }
      setName(''); setPrice(''); setImage('');
      setStatus({ ok: 'Product added' });
      window.dispatchEvent(new Event('products-updated'));
    } catch (err) {
      setStatus({ error: err.message || 'Failed' });
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: 8, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        style={{ border: dragOver ? '2px dashed #0b5fff' : '2px dashed #ddd', padding: 8, borderRadius: 6, minWidth: 240 }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button type="button" onClick={() => fileRef.current && fileRef.current.click()} style={{ padding: '6px 10px', borderRadius: 6, background: '#0b5fff', color: '#fff', border: 'none' }}>➕ Add Image</button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
          <span style={{ color: '#666', fontSize: 13 }}>{image ? 'Image ready' : 'Drag & drop image or click Add Image'}</span>
        </div>
      </div>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" required style={{ padding: 8 }} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" required style={{ padding: 8, width: 120 }} />
      <button onClick={submit} style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#0b5fff', color: '#fff' }}>➕ Add</button>
      {status && status.ok && <span style={{ color: 'green' }}>{status.ok}</span>}
      {status && status.error && <span style={{ color: 'red' }}>{status.error}</span>}
    </div>
  );
}

export default AddProduct;
