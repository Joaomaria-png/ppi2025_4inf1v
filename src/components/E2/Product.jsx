import styles from "./Product.module.css";

export function Product({ 
  id, 
  thumbnail, 
  title, 
  description, 
  price, 
  brand,
  onAddToCart 
}) {
  const handleAddToCart = () => {
    // Função que será implementada no futuro
    if (onAddToCart) {
      onAddToCart({ id, title, price, thumbnail });
    }
    console.log(`Produto ${title} adicionado ao carrinho!`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={thumbnail}
          alt={title}
          className={styles.image}
        />
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.brand}>Marca: {brand}</p>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.footer}>
          <span className={styles.price}>${price}</span>
          <button 
            className={styles.addButton}
            onClick={handleAddToCart}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}