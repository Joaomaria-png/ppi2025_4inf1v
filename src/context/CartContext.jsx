// src/context/CartContext.jsx
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useSession } from "./SessionContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { session } = useSession();
  const userId = session?.user?.id;

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const [error, setError] = useState(null);

  // 🔵 Carregar produtos
  // 🔵 Carregar produtos
useEffect(() => {
  refreshProducts();
}, []);

async function refreshProducts() {
  setProductsLoading(true);

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    setError(error.message);
    setProducts([]);
  } else {
    setProducts(data || []);
  }

  setProductsLoading(false);
}


  // 🟡 Carregar carrinho quando o usuário logar
  useEffect(() => {
    if (userId) refreshCart();
  }, [userId]);

  async function refreshCart() {
    setCartLoading(true);

    const { data, error } = await supabase
      .from("cart")
      .select("*, products(*)")
      .eq("user_id", userId);

    if (error) {
      setError(error.message);
      setCart([]);
      setCartLoading(false);
      return;
    }

    const fullCart = data.map((item) => ({
      id: item.product_id,
      qty: item.qty,
      title: item.products.title,
      price: item.products.price,
      thumbnail: item.products.thumbnail,
      description: item.products.description,
    }));

    setCart(fullCart);
    setCartLoading(false);
  }

  // 🟩 Adicionar ao carrinho
  async function addToCart(product) {
    if (!session) {
      alert("Você precisa estar logado!");
      return;
    }

    const existing = cart.find((item) => item.id === product.id);
    const qty = existing ? existing.qty + 1 : 1;

    const { error } = await supabase.from("cart").upsert({
      user_id: userId,
      product_id: product.id,
      qty,
    });

    if (error) setError(error.message);
    refreshCart();
  }

  // 🟧 Atualizar quantidade
  async function updateQtyCart(productId, qty) {
    if (qty < 1) return removeFromCart(productId);

    const { error } = await supabase
      .from("cart")
      .update({ qty })
      .match({ user_id: userId, product_id: productId });

    if (error) setError(error.message);

    refreshCart();
  }

  // 🟥 Remover do carrinho
  async function removeFromCart(productId) {
    const { error } = await supabase
      .from("cart")
      .delete()
      .match({ user_id: userId, product_id: productId });

    if (error) setError(error.message);

    refreshCart();
  }

  // ⬛ Limpar carrinho
  async function clearCart() {
    await supabase.from("cart").delete().eq("user_id", userId);
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        productsLoading,
        cart,
        cartLoading,
        error,
        addToCart,
        updateQtyCart,
        removeFromCart,
        clearCart,
        refreshProducts, // << ADICIONE AQUI
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
