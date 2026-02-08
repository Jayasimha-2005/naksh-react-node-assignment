import React, { createContext, useState, useMemo, useEffect } from 'react';

const defaultCart = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  totalItems: 0,
  totalPrice: 0,
};

export const CartContext = createContext(defaultCart);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Load existing cart items from backend on mount
  useEffect(() => {
    let mounted = true;

    const loadCart = async () => {
      try {
        const res = await fetch(`${API_BASE}/cart`);
        if (!res.ok) throw new Error('Failed to load cart');
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          setCartItems(
            data.map((it) => ({
              id: it._id || it.productId || String(it.productId),
              productId: it.productId,
              name: it.name,
              price: it.price,
              quantity: it.quantity,
            }))
          );
        }
      } catch (err) {
        console.warn('Could not load cart from API', err.message || err);
      }
    };

    loadCart();

    return () => {
      mounted = false;
    };
  }, [API_BASE]);

  // Attempts to persist the cart item to backend, performs optimistic update for instant UI
  const addToCart = async (product) => {
    // Ensure values are normalized
    const pid = String(product.id || product._id || product.productId || product.name);
    const name = product.name || 'Item';
    const price = Number(product.price || 0);

    // Optimistic update: update local state immediately so UI reflects change
    setCartItems((prev) => {
      const existing = prev.find((p) => p.productId === pid || p.id === pid);
      if (existing) {
        return prev.map((p) => (p.productId === pid || p.id === pid ? { ...p, quantity: (p.quantity || 0) + 1 } : p));
      }
      return [...prev, { id: pid, productId: pid, name, price, quantity: 1 }];
    });

    // Attempt to persist the cart item to backend; if it fails, keep optimistic update
    try {
      const payload = {
        productId: pid,
        name,
        price,
        quantity: 1,
      };

      console.log('[CartContext] POST /cart payload', payload);

      const res = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        console.warn('[CartContext] Cart API rejected add request, keeping optimistic update', res.status, errBody);
        return { ok: false, error: errBody };
      }

      const body = await res.json().catch(() => null);
      console.log('[CartContext] POST /cart response', res.status, body);

      if (body && body.item) {
        const returned = body.item;
        // Replace optimistic item id with real DB id if different
        setCartItems((prev) => prev.map((p) => (p.productId === pid ? { ...p, id: returned._id || p.id } : p)));
        return { ok: true, item: returned };
      }

      return { ok: true, body };
    } catch (err) {
      console.warn('[CartContext] Add to cart request failed, optimistic update preserved', err);
      return { ok: false, error: err };
    }
  };

  const removeFromCart = (id) => {
    // Attempt to delete on backend, then update local state
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/cart/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          console.warn('Failed to delete from backend cart', body);
        }
      } catch (err) {
        console.warn('Delete cart request failed', err);
      } finally {
        setCartItems((prev) => prev.filter((p) => p.id !== id));
      }
    })();
  };

  const updateQuantity = (id, quantity) => {
    // Attempt to update backend, then update local state
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/cart/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          console.warn('Failed to update backend cart', body);
        } else {
          const body = await res.json().catch(() => null);
          if (body && body.item) {
            const returned = body.item;
            setCartItems((prev) => prev.map((p) => (p.id === id || p.productId === returned.productId ? { ...p, quantity: returned.quantity } : p)));
            return;
          }
        }
      } catch (err) {
        console.warn('Update cart request failed', err);
      }

      // Local fallback
      setCartItems((prev) => {
        if (quantity <= 0) return prev.filter((p) => p.id !== id);
        return prev.map((p) => (p.id === id ? { ...p, quantity } : p));
      });
    })();
  };

  const clearCart = async () => {
    // Clear cart on backend and locally
    try {
      // Attempt to delete all items from backend
      await Promise.all(
        cartItems.map(item => 
          fetch(`${API_BASE}/cart/${item.id}`, { method: 'DELETE' }).catch(err => 
            console.warn('Failed to delete cart item', err)
          )
        )
      );
    } catch (err) {
      console.warn('Clear cart request failed', err);
    } finally {
      // Always clear local state
      setCartItems([]);
    }
  };

  const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0), [cartItems]);
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + (Number(item.price || 0) * (item.quantity || 0)), 0),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
