import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useSession } from "./SessionContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { session } = useSession();
  const userId = session?.user?.id;

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega produtos da loja
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select(); // 👈 nome certo da tabela
      if (error) setError(error.message);
      else setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Carrega carrinho do usuário
  useEffect(() => {
    if (userId) refreshCart();
  }, [userId]);

  async function refreshCart() {
    const { data, error } = await supabase
      .from("cart")
      .select("*")
      .eq("userId", userId); // 👈 coluna camelCase

    if (error) {
      console.error("Erro ao carregar carrinho:", error.message);
      setCart([]);
    } else {
      setCart(data || []);
    }
  }

  async function addToCart(product) {
    if (!userId) {
      alert("Você precisa estar logado para adicionar ao carrinho!");
      return;
    }

    const existing = cart.find((item) => item.productId === product.id);
    const qty = existing ? existing.qty + 1 : 1;

    const { error } = await supabase.from("cart").upsert({
      userId: userId,
      productId: product.id,
      qty,
    });

    if (error) {
      console.error("Erro ao adicionar ao carrinho:", error.message);
    }
    refreshCart();
  }

  async function updateQtyCart(productId, qty) {
    const { error } = await supabase
      .from("cart")
      .update({ qty })
      .match({ userId: userId, productId });

    if (error) {
      console.error("Erro ao atualizar quantidade:", error.message);
    }
    refreshCart();
  }

  async function removeFromCart(productId) {
    const { error } = await supabase
      .from("cart")
      .delete()
      .match({ userId: userId, productId });

    if (error) {
      console.error("Erro ao remover item:", error.message);
    }
    refreshCart();
  }

  async function clearCart() {
    const { error } = await supabase.from("cart").delete().match({ userId: userId });
    if (error) {
      console.error("Erro ao limpar carrinho:", error.message);
    }
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        loading,
        error,
        addToCart,
        updateQtyCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
