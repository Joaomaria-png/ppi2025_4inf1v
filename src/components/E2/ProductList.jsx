import styles from "./ProductList.module.css";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export function ProductList() {
  const category = "smartphones";
  const limit = 10;
  const apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,brand,title,price,description`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  async function fetchProducts() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setError("Erro ao carregar os produtos.");
    } finally {
      setLoading(false);
    }
  }

  fetchProducts(); // Chamando a função dentro do useEffect
}, [apiUrl]);


  return (
    <div className={styles.container}>
      <h1>TJA Megastore</h1>

      {loading && (
        <div className={styles.loading}>
          <CircularProgress />
          <p>Carregando produtos...</p>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <p>Erro: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.image}
              />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p className={styles.price}>${product.price}</p>
              <p className={styles.brand}>Marca: {product.brand}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
