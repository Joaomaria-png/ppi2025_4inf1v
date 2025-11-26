import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { SessionProvider, useSession } from "./context/SessionContext"; 
import { Login } from "./components/Login";
import { ToastContainer } from "react-toastify";
import { User } from "./components/User";
import { AdminProductList } from "./components/AdminProductList";

// 🔒 Rota protegida para admin
function AdminRoute({ children }) {
  const { isAdmin } = useSession();
  return isAdmin ? children : <Navigate to="/" replace />;
}

// 🔒 Rota protegida para usuário logado
function PrivateRoute({ children }) {
  const { session } = useSession();
  return session ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <>
      <ToastContainer />
      <SessionProvider>
        <CartProvider>
          <Header />

          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<Login value="signin" />} />
            <Route path="/register" element={<Login value="register" />} />

            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminProductList />
                </AdminRoute>
              }
            />
          </Routes>
        </CartProvider>
      </SessionProvider>
    </>
  );
}
