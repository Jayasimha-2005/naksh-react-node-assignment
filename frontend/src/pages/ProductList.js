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
          setError(null);
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
      }).catch(() => {}).finally(() => setLoading(false));
    }

    window.addEventListener('products-updated', onProductsUpdated);
    return () => window.removeEventListener('products-updated', onProductsUpdated);
  }, [API_BASE]);

  const roleCtx = useContext(RoleContext) || { role: 'buyer' };
  const role = roleCtx && roleCtx.role ? roleCtx.role : 'buyer';

  // Search is controlled by parent; no local effect required.

  const filtered = useMemo(() => {
    const key = (search || '').trim().toLowerCase();
    if (!key) return products;
    return products.filter((p) => (p.name || '').toLowerCase().includes(key));
  }, [search, products]);

  return (
    <>
      {role === 'seller' && (
        <div style={{ padding: 12 }}>
          <AddProduct />
        </div>
      )}
      <main className="product-grid">
        {loading && <div>Loading products...</div>}
        {!loading && products.length === 0 && !error && <div>No products available.</div>}
        {!loading && filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        {!loading && usingDemo && (
          <div style={{ color: 'var(--muted-color, #666)', padding: 8, fontSize: 13 }}>
            Showing demo data (backend unavailable)
          </div>
        )}
      </main>
    </>
  );
}

export default ProductList;
