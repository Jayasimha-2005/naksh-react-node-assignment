import React, { useMemo, useState } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import '../components/ProductCard.css';

function ProductList() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const key = search.trim().toLowerCase();
    if (!key) return products;
    return products.filter((p) => p.name.toLowerCase().includes(key));
  }, [search]);

  return (
    <>
      <Header searchValue={search} onSearch={setSearch} />
      <main className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </main>
    </>
  );
}

export default ProductList;
