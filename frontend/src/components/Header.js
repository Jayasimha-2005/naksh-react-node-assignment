import React from 'react';
import './Header.css';
import { useContext, useState, useRef, useEffect, createContext } from 'react';
import { CartContext } from '../context/CartContext';
import Cart from './Cart';
import { RoleContext } from '../context/RoleContext';

function Header({ searchValue, onSearch, onViewCart }) {
  const safeDefault = { totalItems: 0, cartItems: [], removeFromCart: () => {}, updateQuantity: () => {} };
  const SafeContext = CartContext || createContext(safeDefault);
  const ctx = useContext(SafeContext) || safeDefault;
  const totalItems = (ctx && ctx.totalItems) || 0;
  const cartItems = (ctx && ctx.cartItems) || [];
  const removeFromCart = (ctx && ctx.removeFromCart) || (() => {});
  const updateQuantity = (ctx && ctx.updateQuantity) || (() => {});
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const roleCtx = useContext(RoleContext) || { role: 'buyer', setRole: () => {} };

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
        {/* show role badge when seller for visibility */}
        {roleCtx && roleCtx.role === 'seller' && (
          <div className="role-badge" aria-hidden>
            Seller mode
          </div>
        )}

        <div className="search">
          <input
            type="search"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>

        <div style={{ marginLeft: 12 }}>
          <RoleToggle />
        </div>

        <div className="cart" ref={ref} style={{ position: 'relative' }}>
          <button
            className="cart-button"
            onClick={() => {
              // if parent provided a page-level handler, navigate there; otherwise toggle dropdown
              if (typeof onViewCart === 'function') return onViewCart();
              setOpen((s) => !s);
            }}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-count" aria-live="polite">{totalItems}</span>
          </button>
          {open && <Cart items={cartItems} onRemove={removeFromCart} onUpdate={updateQuantity} onViewCart={() => onViewCart && onViewCart()} />}
        </div>
      </div>
    </header>
  );
}

function RoleToggle() {
  const roleCtx = useContext(RoleContext) || { role: 'buyer', setRole: () => {} };
  const role = (roleCtx && roleCtx.role) || 'buyer';
  const setRole = (roleCtx && roleCtx.setRole) || (() => {});
  return (
    <div className="role-toggle">
      <label style={{ fontSize: 13 }}>
        <input type="checkbox" checked={role === 'seller'} onChange={(e) => setRole(e.target.checked ? 'seller' : 'buyer')} /> Seller
      </label>
    </div>
  );
}

export default Header;
