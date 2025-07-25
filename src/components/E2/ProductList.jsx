import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";
import { useContext } from "react";
import { CartContext } from "../../service/CartContext";

export function ProductList() {
  
  const { products, loading, error } = useContext(CartContext);
  const searchInput = useReff(null);

  function handleSearch() {
    const query = searchInput.current.value.toLowerCase();
    console.log("Searching for:", query);
  }

  function handleClear(){
    searchInput.current.value = "";

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
        {products.map((product) => (
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