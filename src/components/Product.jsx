import styles from "./Product.module.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function Product({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className={styles.productCard}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.productImage}
      />

      <h2 className={styles.productTitle}>{product.title}</h2>

      <p className={styles.productDescription}>{product.description}</p>

      <p className={styles.productPrice}>${Number(product.price).toFixed(2)}</p>

      <button
        onClick={() => addToCart(product)}
        className={styles.productButton}
      >
        ADD TO CART
      </button>
    </div>
  );
}
