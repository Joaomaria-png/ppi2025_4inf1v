import styles from "./Cart.module.css";

export function Cart({ cart, updateQuantity, removeAllItems }) {
  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <button className={styles.clearCartBtn} onClick={removeAllItems}>
            Remover todos os itens
          </button>
          <ul className={styles.cartList}>
            {cart.map((product, index) => (
              <li key={index} className={styles.cartItem}>
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <h3>{product.title}</h3>
                  <p>Preço unitário: R$ {product.price.toFixed(2)}</p>
                  <div className={styles.quantityControl}>
                    <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                  </div>
                  <p>Total: R$ {(product.price * product.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
