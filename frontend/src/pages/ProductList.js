import React, { useMemo, useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import '../components/ProductCard.css';
import { RoleContext } from '../context/RoleContext';
import AddProduct from '../components/AddProduct';
import demoProducts from '../data/products';

function ProductList({ searchProp, onSearch }) {
  // `search` is controlled by App/Header and passed as `searchProp`.
  // Keep ProductList stateless for search to avoid duplicate state and HMR warnings.
  const search = searchProp || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDemo, setUsingDemo] = useState(false);
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/products`, { signal });
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          setProducts(data.map((p) => ({ id: p._id || p.id || p.productId || p.name, ...p })));
          setError(null);
          setUsingDemo(false);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        // fallback to bundled demo data
        if (mounted) {
          setProducts(demoProducts.map((p) => ({ id: p.id, ...p })));
          setError('Backend unavailable, showing demo products');
          setUsingDemo(true);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [API_BASE]);

  useEffect(() => {
    function onProductsUpdated() {
      // re-fetch products
      setLoading(true);
      fetch(`${API_BASE}/products`).then((r) => r.json()).then((data) => {
        setProducts(Array.isArray(data) ? data.map((p) => ({ id: p._id || p.id || p.productId || p.name, ...p })) : []);
        setUsingDemo(false);
        setError(null);
      }).catch(() => {
        setProducts(demoProducts.map((p) => ({ id: p.id, ...p })));
        setUsingDemo(true);
        setError('Backend unavailable, showing demo products');
      }).finally(() => setLoading(false));
    }

    window.addEventListener('products-updated', onProductsUpdated);
    return () => window.removeEventListener('products-updated', onProductsUpdated);
  }, [API_BASE]);

  const roleCtx = useContext(RoleContext) || { role: 'buyer' };
  const role = roleCtx && roleCtx.role ? roleCtx.role : 'buyer';

  const filtered = useMemo(() => {
    const key = (search || '').trim().toLowerCase();
    if (!key) return products;
    return products.filter((p) => (p.name || '').toLowerCase().includes(key));
  }, [search, products]);

  return (
    <>
      {role === 'seller' && (
        <div style={{ padding: '0 24px' }}>
          <AddProduct />
        </div>
      )}
      
      {loading && (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <div className="spinner"></div>
          <p style={{ marginTop: 16, color: '#667eea', fontWeight: 600 }}>Loading amazing products...</p>
        </div>
      )}
      
      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, maxWidth: 500, margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
          <h2 style={{ color: '#374151', marginBottom: 8 }}>
            {search ? 'No products found' : 'No products available'}
          </h2>
          <p style={{ color: '#6b7280' }}>
            {search 
              ? `Try searching for something else` 
              : role === 'seller' 
                ? 'Add your first product above' 
                : 'Check back soon for new items'}
          </p>
        </div>
      )}
      
      {!loading && filtered.length > 0 && (
        <>
          {usingDemo && error && (
            <div style={{ 
              margin: '24px auto',
              maxWidth: 1400,
              padding: '12px 24px',
              background: '#fef3c7',
              border: '1px solid #fbbf24',
              borderRadius: 12,
              color: '#92400e',
              fontWeight: 500,
              textAlign: 'center'
            }}>
              ⚠️ {error}
            </div>
          )}
          <main className="product-grid">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </main>
        </>
      )}
    </>
  );
}

export default ProductList;
