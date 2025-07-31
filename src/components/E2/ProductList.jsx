import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";
import { useContext, useRef, useEffect, useState } from "react";
import { CartContext } from "../../service/CartContext";

export default function ProductList() {
  const { products, loading, error } = useContext(CartContext);
  const searchInput = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Inicializa a lista com todos os produtos ao carregar
    setFilteredProducts(products);
  }, [products]);

  function handleSearch() {
    const query = searchInput.current.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }

  function handleClear() {
    searchInput.current.value = "";
    setFilteredProducts(products); // 🔁 restaura a lista original
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
