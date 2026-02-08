import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

function CartPage({ onBack }) {
  const cart = useContext(CartContext) || { cartItems: [], updateQuantity: () => {}, removeFromCart: () => {}, clearCart: () => {}, totalPrice: 0, totalItems: 0 };
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = cart;
  const [showAnimation, setShowAnimation] = useState(false);

  const handleCheckout = () => {
    setShowAnimation(true);
    // Clear cart and redirect after animation completes
    setTimeout(() => {
      if (clearCart) clearCart();
      setTimeout(() => {
        setShowAnimation(false);
        if (onBack) onBack();
      }, 500);
    }, 3500); // 3.5 seconds for full animation
  };

  return (
    <div className="cart-page">
      {/* Checkout Animation Overlay */}
      {showAnimation && (
        <div className="checkout-animation-overlay">
          <div className="delivery-animation">
            <div className="delivery-bus">🚚</div>
            <div className="delivery-checkmark">✓</div>
            <div className="delivery-message">Order Placed Successfully!</div>
          </div>
        </div>
      )}

      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart ({totalItems || 0} items)</h1>
        <button className="btn-secondary" onClick={() => onBack && onBack()}>
          ← Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2 className="empty-title">Your cart is empty</h2>
          <p className="empty-subtitle">No items available in your cart right now</p>
          <p className="empty-description">Add some amazing jewelry to get started!</p>
          <button className="btn-primary empty-cta" onClick={() => onBack && onBack()}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.map((it) => {
              const subtotal = (Number(it.price) * Number(it.quantity || 1)).toFixed(2);
              return (
                <div key={it.id} className="cart-item">
                  <div className="cart-item-details">
                    <div>
                      <div className="cart-item-name">{it.name}</div>
                      <div className="cart-item-price">₹{it.price} each</div>
                      <div className="cart-item-subtotal">Subtotal: ₹{subtotal}</div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button 
                          className="quantity-btn" 
                          onClick={() => updateQuantity(it.id, Math.max(1, (it.quantity || 1) - 1))}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <div className="quantity-value">{it.quantity || 1}</div>
                        <button 
                          className="quantity-btn" 
                          onClick={() => updateQuantity(it.id, (it.quantity || 1) + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-btn" 
                        onClick={() => removeFromCart(it.id)}
                        aria-label="Remove item"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="summary-row">
              <span>Tax (18% GST)</span>
              <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(totalPrice * 1.18).toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              🛍️ Proceed to Checkout
            </button>
            <div style={{ marginTop: 16, padding: 12, background: '#f0fdf4', borderRadius: 8, fontSize: '0.9rem', color: '#166534', textAlign: 'center' }}>
              ✓ Secure Checkout · Free Shipping
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
