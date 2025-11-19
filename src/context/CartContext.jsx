import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useSession } from "./SessionContext";

export const CartContext = createContext();

const [session, setSession] = useState(null)
const [sessionLoading, setSessionLoading] = useState(null)
const [sessionMessage, setSessionMessage] = useState(null)
const [sessionrror, setSessionError] = useState(null)

async function handleSignUo(email, password, username) {
  setSessionLoading(true)
  setSessionMessage(null)
  setSessionError(null)

  try{
    const {data, error} = await supabase.auth.singUp({
      email,
      password,
      options: {
        data: {
          username: username,
          admin: false,
        },
        emailRedirectTo: '${window.location.origin}/signin',
      },
    });

    if (error) throw error;

    if(data.user) {
      setSessionMessage("Registration sucessful! Check your email to confirm your account.")
    }

  } catch(error) {
    setSessionError(error.message)
  } finally{
    setSessionLoading(false)
  }
}

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
      const { data, error } = await supabase.from("product_2v").select();
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
    const { data } = await supabase.from("CART").select("*").eq("user_id", userId);
    setCart(data || []);
  }

  async function addToCart(product) {
    const existing = cart.find((item) => item.product_id === product.id);
    const quantity = existing ? existing.quantity + 1 : 1;

    await supabase.from("CART").upsert({
      user_id: userId,
      product_id: product.id,
      quantity,
    });
    refreshCart();
  }

  async function updateQtyCart(productId, quantity) {
    await supabase.from("CART").update({ quantity }).match({ user_id: userId, product_id: productId });
    refreshCart();
  }

  async function removeFromCart(productId) {
    await supabase.from("CART").delete().match({ user_id: userId, product_id: productId });
    refreshCart();
  }

  async function clearCart() {
    await supabase.from("CART").delete().match({ user_id: userId });
    setCart([]);
  }

  return (
    <CartContext.Provider value={{
      products,
      cart,
      loading,
      error,
      addToCart,
      updateQtyCart,
      removeFromCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
