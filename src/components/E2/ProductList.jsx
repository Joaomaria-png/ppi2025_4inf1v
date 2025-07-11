import styles from "./ProductList.module.css";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Product } from "./Product";

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

    fetchProducts();
  }, [apiUrl]);

  const handleAddToCart = (product) => {
    // Função que será implementada no futuro para gerenciar o carrinho
    console.log("Produto adicionado ao carrinho:", product);
  };

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
            <Product
              key={product.id}
              id={product.id}
              thumbnail={product.thumbnail}
              title={product.title}
              description={product.description}
              price={product.price}
              brand={product.brand}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}