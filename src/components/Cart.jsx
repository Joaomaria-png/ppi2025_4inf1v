import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Trash } from "lucide-react";

export function Cart() {
  const { cart, updateQtyCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id} className={styles.cartItem}>
              <img src={product.thumbnail} alt={product.title} />

              <h3>{product.title}</h3>

              <p>${Number(product.price).toFixed(2)}</p>

              {/* Quantity controls */}
              <div className={styles.quantityControls}>
                <button
                  disabled={product.qty <= 1}
                  onClick={() =>
                    updateQtyCart(product.id, product.qty - 1)
                  }
                >
                  -
                </button>

                <span>{product.qty}</span>

                <button
                  onClick={() =>
                    updateQtyCart(product.id, product.qty + 1)
                  }
                >
                  +
                </button>
              </div>

              {/* Remove one item */}
              <button
                onClick={() => removeFromCart(product.id)}
                className={styles.removeButton}
              >
                <Trash />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Clear entire cart */}
      {cart.length > 0 && (
        <button onClick={clearCart} className={styles.removeButton}>
          CLEAR CART <Trash />
        </button>
      )}
    </div>
  );
}
