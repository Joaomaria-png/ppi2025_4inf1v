import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/E2/ProductList";
import { Header } from "./components/E1/Header";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Cart } from "./components/E2/Cart";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product, quantity) {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === product.id);
      if (quantity <= 0) return prevCart.filter(item => item.id !== product.id);

      if (exists) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity, total: quantity * product.price }
            : item
        );
      }

      return [...prevCart, { ...product, quantity, total: quantity * product.price }];
    });
  }

  function updateQuantity(productId, quantity) {
    setCart((prevCart) => {
      if (quantity <= 0) return prevCart.filter(item => item.id !== productId);

      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity, total: quantity * item.price }
          : item
      );
    });
  }

  function removeAllItems() {
    setCart([]);
  }

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <div className="cart">
              <Cart cart={cart} updateQuantity={updateQuantity} removeAllItems={removeAllItems} />
            </div>
          }
        />
      </Routes>
    </>
  );
}
