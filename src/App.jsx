import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { SessionProvider, useSession } from "./context/SessionContext"; 
import { Login } from "./components/Login";
import { ToastContainer } from "react-toastify";
import { User } from "./components/User";
import { AdminProductList } from "./components/AdminProductList"; // novo import

// 🔒 Rota protegida para admin
function AdminRoute({ children }) {
  const { isAdmin } = useSession();
  return isAdmin ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <>
      <ToastContainer />
      <SessionProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<Login value="signin" />} />
              <Route path="/register" element={<Login value="register" />} />
              <Route path="/user" element={<User />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminProductList />
                  </AdminRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SessionProvider>
    </>
  );
}
