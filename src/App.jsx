import "./styles/theme.css";
import "./styles/global.css";
import ProductList from "./components/E2/ProductList";
import Header from "./components/E1/Header";
import { Routes, Route } from "react-router-dom";
import { Cart } from "./components/E2/Cart";
import { CartProvider } from "./service/CartContext";

// Importe os novos componentes que criamos
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import ProductListAdmin from './components/products/ProductListAdmin';
import ProductForm from './components/products/ProductForm';

export default function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          {/* Rotas atuais do seu projeto */}
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Rotas de login e cadastro */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          
          {/* Rotas para gerenciar produtos (inserir, remover, atualizar) */}
          <Route path="/products/admin" element={<ProductListAdmin />} />
          <Route path="/products/admin/add" element={<ProductForm />} />
          {/* A rota abaixo usa um parâmetro ":id" para editar um produto específico */}
          <Route path="/products/admin/edit/:id" element={<ProductForm />} />
        </Routes>
      </CartProvider>
    </>
  );
}