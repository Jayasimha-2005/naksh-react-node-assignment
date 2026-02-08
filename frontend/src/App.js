import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './pages/ProductList';
import CartPage from './pages/Cart';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import { RoleProvider } from './context/RoleContext';

function App() {
  const [view, setView] = useState('products'); // 'products' | 'cart'
  const [search, setSearch] = useState('');

  // Global error handlers to catch unhandled promise rejections and surface them nicely
  useEffect(() => {
    const onUnhandledRejection = (e) => {
      console.error('Unhandled promise rejection:', e.reason || e);
      try {
        // eslint-disable-next-line no-alert
        alert('An unexpected error occurred. Check console for details.');
      } catch (err) {
        // ignore
      }
    };

    const onError = (e) => {
      console.error('Global error caught:', e.error || e);
    };

    window.addEventListener('unhandledrejection', onUnhandledRejection);
    window.addEventListener('error', onError);
    return () => {
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
      window.removeEventListener('error', onError);
    };
  }, []);

  // Listen for navigation events from child components (e.g., navigate to cart)
  useEffect(() => {
    const onNavigate = (e) => {
      try {
        const detail = e && e.detail ? e.detail : null;
        if (detail && detail.view === 'cart') setView('cart');
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener('navigate', onNavigate);
    return () => window.removeEventListener('navigate', onNavigate);
  }, []);

  return (
    <RoleProvider>
      <CartProvider>
        <div className="App">
          <Header searchValue={search} onSearch={setSearch} onViewCart={() => setView('cart')} />
          {view === 'products' ? (
            <ProductList searchProp={search} onSearch={setSearch} />
          ) : (
            <CartPage onBack={() => setView('products')} />
          )}
        </div>
      </CartProvider>
    </RoleProvider>
  );
}


export default App;
