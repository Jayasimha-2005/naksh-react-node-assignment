import React from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import '../components/ProductCard.css';

function ProductList() {
  return (
    <main className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </main>
  );
}

export default ProductList;
