import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../service/CartContext";

export default function Header() {
  const { cart } = useContext(CartContext);
  const uniqueItemsCount = cart.length;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>
      <Link to="/cart" className={styles.link}>
        <div className={styles.cartInfo}>
          <div className={styles.basketWrapper}>
            <ShoppingBasket size={32} />
            {uniqueItemsCount > 0 && (
              <span className={styles.basketBadge}>{uniqueItemsCount}</span>
            )}
          </div>
          <p>
            Total: ${" "}
            {cart
              .reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
}
