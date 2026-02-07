import React, { useMemo, useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import '../components/ProductCard.css';

function ProductList() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${API_BASE}/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setProducts(data.map((p) => ({ id: p._id || p.id || p.productId || p.name, ...p })));
        }
      })
      .catch((err) => {
        console.error('Could not load products from API', err.message || err);
        setError(err.message || String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [API_BASE]);

  const filtered = useMemo(() => {
    const key = search.trim().toLowerCase();
    if (!key) return products;
    return products.filter((p) => (p.name || '').toLowerCase().includes(key));
  }, [search, products]);

  return (
    <>
      <Header searchValue={search} onSearch={setSearch} />
      <main className="product-grid">
        {loading && <div>Loading products...</div>}
        {!loading && products.length === 0 && !error && <div>No products available.</div>}
        {!loading && filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        {!loading && error && (
          <div style={{ color: 'var(--error-color, #c00)', padding: 12 }}>Error loading products: {error}</div>
        )}
      </main>
    </>
  );
}

export default ProductList;
