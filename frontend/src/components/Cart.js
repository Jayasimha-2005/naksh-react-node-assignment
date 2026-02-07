import React from 'react';
import './ProductCard.css';

function Cart({ items, onRemove, onUpdate, onViewCart }) {
  const total = items.reduce((s, it) => s + (Number(it.price || 0) * (it.quantity || 0)), 0);

  return (
    <div className="cart-dropdown" role="dialog" aria-label="Cart">
      <div style={{ padding: 12 }}>
        <strong>Cart</strong>
      </div>
      <div className="cart-items" style={{ maxHeight: 260, overflow: 'auto' }}>
        {items.length === 0 && <div style={{ padding: 12 }}>Your cart is empty.</div>}
        {items.map((it) => (
          <div key={it.id} style={{ display: 'flex', gap: 8, padding: 8, alignItems: 'center', borderTop: '1px solid #f0f0f0' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14 }}>{it.name}</div>
              <div style={{ fontSize: 13, color: '#666' }}>₹{it.price} × {it.quantity}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => onUpdate(it.id, Math.max(1, (it.quantity || 1) - 1))} aria-label="Decrease">-</button>
              <button onClick={() => onUpdate(it.id, (it.quantity || 1) + 1)} aria-label="Increase">+</button>
              <button onClick={() => onRemove(it.id)} style={{ color: '#c00' }} aria-label="Remove">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: 12, borderTop: '1px solid #eee', display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <strong>Total</strong>
          <strong>₹{total}</strong>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onViewCart && onViewCart()} style={{ padding: '6px 10px', background: '#0b5fff', color: '#fff', border: 'none', borderRadius: 6 }}>View Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
