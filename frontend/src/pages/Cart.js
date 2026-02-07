import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartPage({ onBack }) {
  const cart = useContext(CartContext) || { cartItems: [], updateQuantity: () => {}, removeFromCart: () => {}, totalPrice: 0 };
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = cart;

  return (
    <main style={{ maxWidth: 1100, margin: '20px auto', padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Your Cart</h2>
        <div>
          <button onClick={() => onBack && onBack()} style={{ marginRight: 8 }}>Continue shopping</button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ padding: 24, border: '1px dashed #e6e6e6', borderRadius: 8 }}>Your cart is empty.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
          <div>
            {cartItems.map((it) => (
              <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, border: '1px solid #f3f3f3', borderRadius: 6, marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{it.name}</div>
                  <div style={{ color: '#666' }}>₹{it.price} × {it.quantity}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button onClick={() => updateQuantity(it.id, Math.max(1, (it.quantity || 1) - 1))}>-</button>
                  <div style={{ minWidth: 28, textAlign: 'center' }}>{it.quantity}</div>
                  <button onClick={() => updateQuantity(it.id, (it.quantity || 1) + 1)}>+</button>
                  <button onClick={() => removeFromCart(it.id)} style={{ color: '#c00' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <aside style={{ border: '1px solid #f3f3f3', padding: 12, borderRadius: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>Total</div>
              <div style={{ fontWeight: 700 }}>₹{totalPrice}</div>
            </div>
            <button style={{ width: '100%', padding: '10px 12px', background: '#0b5fff', color: '#fff', border: 'none', borderRadius: 6 }}>Proceed to Checkout</button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartPage;
