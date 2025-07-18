import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/E2/ProductList";
import { Header } from "./components/E1/Header";
import { useState } from "react";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product, quantity) {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === product.id);

      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== product.id);
      }

      if (exists) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity, total: quantity * product.price }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity,
          total: quantity * product.price
        }
      ];
    });
  }

  return (
    <>
      <Header cart={cart} />
      <ProductList addToCart={addToCart} />
    </>
  );
}
