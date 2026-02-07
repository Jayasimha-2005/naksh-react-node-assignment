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

  // Attempts to persist the cart item to backend, falls back to local state on error
  const addToCart = async (product) => {
    try {
      const payload = {
        productId: String(product.id),
        name: product.name,
        price: product.price,
        quantity: 1,
      };

      const res = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // If backend responds with a validation error, fall back to local update
        const errBody = await res.json().catch(() => ({}));
        console.error('Failed to persist cart item', errBody);
        // continue to local update below
      } else {
        // Use returned item from backend when available
        const body = await res.json().catch(() => null);
        if (body && body.item) {
          const returned = body.item;
          setCartItems((prev) => {
            const existing = prev.find((p) => p.productId === returned.productId || p.id === returned.productId || p.id === returned._id);
            if (existing) {
              return prev.map((p) =>
                (p.productId === returned.productId || p.id === returned.productId || p.id === returned._id)
                  ? { ...p, quantity: (p.quantity || 0) + (returned.quantity || 1) }
                  : p
              );
            }
            // normalize to local shape { id, productId, name, price, quantity }
            return [...prev, { id: returned._id || returned.productId, productId: returned.productId, name: returned.name, price: returned.price, quantity: returned.quantity }];
          });
          return;
        }
      }
    } catch (err) {
      console.error('Add to cart request failed', err);
      // fall back to local update
    }

    // Local fallback update when backend is unreachable or returns error
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id || p.productId === product.id);
      if (existing) {
        return prev.map((p) =>
          (p.id === product.id || p.productId === product.id) ? { ...p, quantity: (p.quantity || 0) + 1 } : p
        );
      }
      return [...prev, { id: product.id, productId: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
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
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
