import React, { useState } from "react";
import styles from "./Product.module.css";

export function Product({ product, addToCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleInitialClick = () => {
    setQuantity(1);
    addToCart(product, 1);
  };

  const handleAdd = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    addToCart(product, newQty);
  };

  const handleRemove = () => {
    const newQty = quantity - 1;
    const finalQty = newQty < 0 ? 0 : newQty;
    setQuantity(finalQty);
    addToCart(product, finalQty);
  };

  return (
    <div className={styles.productCard}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>${product.price}</p>

      {quantity === 0 ? (
        <button onClick={handleInitialClick} className={styles.productButton}>
          ADD TO CART
        </button>
      ) : (
        <div className={styles.counterContainer}>
          <button onClick={handleRemove} className={styles.counterButton}>–</button>
          <span className={styles.counterText}> {quantity}</span>
          <button onClick={handleAdd} className={styles.counterButton}>+</button>
        </div>
      )}
    </div>
  );
}
