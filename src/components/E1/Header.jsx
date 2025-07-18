import styles from "./Header.module.css";

export function Header({ cart }) {
  // Soma total de unidades (quantidade total)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Soma total em dinheiro
  const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);

  return (
    <div className={styles.container}>
      <h1>TJA Megastore</h1>
      <div className={styles.cartInfo}>
        {totalItems > 0 && <p>{totalItems} Produtos</p>}
        <p>Total: $ {totalAmount}</p>
      </div>
    </div>
  );
}
