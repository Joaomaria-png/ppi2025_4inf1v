import { useState, useEffect, createContext } from "react";

export const CartContext = createContext({
  products: [],
  loading: false,
  error: null,
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const category = "smartphones";
  const limit = 10;
  const apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      updateQtyCart(product.id, existingProduct.quantity + 1);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function updateQtyCart(productId, quantity) {
    setCart((prevCart) => {
      if (quantity <= 0) {
        // 🧹 Remove o item do carrinho
        return prevCart.filter((item) => item.id !== productId);
      }

      // Atualiza a quantidade normalmente
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      );
    });
  }

  function clearCart() {
    setCart([]);
  }

  const context = {
    products,
    loading,
    error,
    cart,
    addToCart,
    updateQtyCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  );
}
