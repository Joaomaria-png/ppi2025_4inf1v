import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeToggle } from "./ThemeToggle";
import { SessionContext } from "../context/SessionContext";

export function Header() {
  const { cart } = useContext(CartContext);
  const { session } = useContext(SessionContext);

  const isAdmin = session?.user?.user_metadata?.admin === true;

  return (
    <div className={styles.container}>
      <div>
        <Link to="/" className={styles.link}>
          <h1>TJA Megastore</h1>
        </Link>

        {session && (
          <Link to="/user" className={styles.welcomeMessage}>
            Welcome, {session.user.user_metadata.username}
            {isAdmin && " ⭐"}
          </Link>
        )}

        {/* 🔥 BOTÃO EDIT SÓ PARA ADMIN */}
        {isAdmin && (
          <Link to="/admin" className={styles.link}>
            <strong>EDIT</strong>
          </Link>
        )}
      </div>

      <div className={styles.actions}>
        {!session && (
          <>
            <Link to="/signin" className={styles.link}>
              Sign In
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </>
        )}

        <ThemeToggle />

        <Link to="/cart" className={styles.link}>
          <div className={styles.cartInfo}>
            <div className={styles.cartIcon}>
              <ShoppingBasket size={32} />
              {cart.length > 0 && (
                <span className={styles.cartCount}>
                  {cart.reduce((total, item) => total + item.qty, 0)}
                </span>
              )}
            </div>

            <p>
              Total: $
              {cart
                .reduce((total, product) => {
                  const price = Number(product?.price) || 0;
                  const qty = Number(product?.qty) || 0;
                  return total + price * qty;
                }, 0)
                .toFixed(2)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
