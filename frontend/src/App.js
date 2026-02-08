import React, { useState } from 'react';
import './App.css';
import ProductList from './pages/ProductList';
import CartPage from './pages/Cart';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import { RoleProvider } from './context/RoleContext';

function App() {
  const [view, setView] = useState('products'); // 'products' | 'cart'
  const [search, setSearch] = useState('');

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
