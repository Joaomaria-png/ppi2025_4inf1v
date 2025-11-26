import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";
import { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";

export function ProductList() {

  const { products, productsLoading, error } = useContext(CartContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchInput = useRef();

  // Atualiza lista quando "products" mudar
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  function handleSearch() {
    const q = searchInput.current.value.toLowerCase();
    setFilteredProducts(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q)
      )
    );
  }

  function handleClear() {
    searchInput.current.value = "";
    setFilteredProducts(products);
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          ref={searchInput}
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
          onChange={handleSearch}
        />
        <button className={styles.searchButton} onClick={handleClear}>
          CLEAR
        </button>
      </div>

      {/* Loading */}
      {productsLoading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
          />
          <p>Loading products...</p>
        </div>
      )}

      {/* Error */}
      {error && <p>❌ {error}</p>}

      {/* Lista de produtos */}
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
