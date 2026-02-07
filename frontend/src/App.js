import React from 'react';
import './App.css';
import ProductList from './pages/ProductList';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <ProductList />
      </div>
    </CartProvider>
  );
}

export default App;
