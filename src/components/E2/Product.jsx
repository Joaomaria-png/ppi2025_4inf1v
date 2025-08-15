import styles from "./Product.module.css";
import { useContext } from "react";
import { CartContext } from "../../service/CartContext";
import { Link } from "react-router-dom"; // Corrigido: 'react-router' → 'react-router-dom'

export function Product({ product }) {
  const { addToCart } = useContext(CartContext);

  // 🔧 Normaliza os dados do produto
  const normalizedProduct = {
    id: product.id,
    title: product.title || product.name || "Produto sem título",
    description: product.description || "Sem descrição",
    price: parseFloat(product.price) || 0,
    thumbnail: product.thumbnail || product.imageUrl || "https://via.placeholder.com/150",
    quantity: 1
  };

  return (
    <div key={normalizedProduct.id} className={styles.productCard}>
      <img
        src={normalizedProduct.thumbnail}
        alt={normalizedProduct.title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{normalizedProduct.title}</h2>
      <p className={styles.productDescription}>{normalizedProduct.description}</p>
      <p className={styles.productPrice}>${normalizedProduct.price.toFixed(2)}</p>
      <Link to="/cart">
        <button
          onClick={() => addToCart(normalizedProduct)}
          className={styles.productButton}
        >
          ADD TO CART
        </button>
      </Link>
    </div>
  );
}
