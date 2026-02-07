import React from 'react';
import './Header.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Header({ searchValue, onSearch }) {
  const ctx = useContext(CartContext) || { totalItems: 0 };
  const { totalItems } = ctx;

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">Naksh Jewels</div>

        <div className="search">
          <input
            type="search"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>

        <div className="cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-count" aria-live="polite">{totalItems}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
