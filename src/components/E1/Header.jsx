import { ShoppingBasket } from "lucide-react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export function Header({ cart }) {
  // Soma total de unidades (quantidade total)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Soma total em dinheiro
  const totalAmount = cart
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>
      <Link to="/cart" className={styles.link}>
        <div className={styles.cartInfo}>
          <ShoppingBasket size={32} />
          <p>
            Total: $ {totalAmount}
          </p>
          {totalItems > 0 && <p>{totalItems} Produtos</p>}
        </div>
      </Link>
    </div>
  );
}
