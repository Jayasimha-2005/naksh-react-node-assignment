import React from 'react';
import './Header.css';
import { useContext, useState, useRef, useEffect, createContext } from 'react';
import { CartContext } from '../context/CartContext';
import Cart from './Cart';

function Header({ searchValue, onSearch }) {
  const safeDefault = { totalItems: 0, cartItems: [], removeFromCart: () => {}, updateQuantity: () => {} };
  const SafeContext = CartContext || createContext(safeDefault);
  const ctx = useContext(SafeContext) || safeDefault;
  const { totalItems, cartItems, removeFromCart, updateQuantity } = ctx;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

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

        <div className="cart" ref={ref} style={{ position: 'relative' }}>
          <button className="cart-button" onClick={() => setOpen((s) => !s)} aria-haspopup="true" aria-expanded={open}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count" aria-live="polite">{totalItems}</span>
          </button>
          {open && <Cart items={cartItems} onRemove={removeFromCart} onUpdate={updateQuantity} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
