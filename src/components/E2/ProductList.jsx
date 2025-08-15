import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";
import { useContext, useRef, useEffect, useState } from "react";
import { CartContext } from "../../service/CartContext";

export default function ProductList() {
  const { products: contextProducts, loading, error } = useContext(CartContext);
  const searchInput = useRef(null);
  const [combinedProducts, setCombinedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Mescla os produtos do contexto com os do localStorage
    const allProducts = [...contextProducts, ...localProducts];
    setCombinedProducts(allProducts);
    setFilteredProducts(allProducts);
  }, [contextProducts]);

  function handleSearch() {
    const query = searchInput.current.value.toLowerCase();
    const filtered = combinedProducts.filter((product) =>
      product.name?.toLowerCase().includes(query) || product.title?.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }

  function handleClear() {
    searchInput.current.value = "";
    setFilteredProducts(combinedProducts);
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
        <button onClick={handleClear} className={styles.clearButton}>
          Clear
        </button>
      </div>

      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{ color: "#001111" }}
          />
          <p>Loading products...</p>
        </div>
      )}
      {error && <p>Error loading products: {error.message} ❌</p>}
    </div>
  );
}
