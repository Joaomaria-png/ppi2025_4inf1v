import "./styles/theme.css";
import "./styles/global.css";
import ProductList from "./components/E2/ProductList";
import Header from "./components/E1/Header";
import { Routes, Route } from "react-router-dom";
import { Cart } from "./components/E2/Cart";
import { CartProvider } from "./service/CartContext";

export default function App() {
  return (
    <>
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
   </>
  );
}
