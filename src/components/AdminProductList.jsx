import { useCart } from "../context/CartContext";
import { useSession } from "../context/SessionContext";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export function AdminProductList() {
  const { products, refreshProducts } = useCart();
  const { session } = useSession();

  const isAdmin = session?.user?.user_metadata?.admin;

  const [localProducts, setLocalProducts] = useState(products);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    thumbnail: "",
    description: "",
  });

  if (!isAdmin) return <p>Acesso negado. Somente administradores.</p>;

  // 🔄 SINCRONIZA localProducts quando products mudar
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  // ----------------------------------
  // Atualizar produto localmente
  // ----------------------------------
  function handleChange(id, field, value) {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  // ----------------------------------
  // Remover produto localmente
  // ----------------------------------
  function handleRemove(id) {
    setLocalProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // ----------------------------------
  // Adicionar novo produto localmente
  // ----------------------------------
  function handleAdd(e) {
    e.preventDefault();

    const tempId = Date.now();

    setLocalProducts((prev) => [
      ...prev,
      { ...newProduct, id: tempId, isNew: true },
    ]);

    setNewProduct({
      title: "",
      price: "",
      thumbnail: "",
      description: "",
    });
  }

  // ----------------------------------
  // SUBMIT (CRUD COMPLETO)
  // ----------------------------------
  async function handleSubmit() {
    try {
      const oldIds = products.map((p) => p.id);
      const newIds = localProducts.map((p) => p.id);

      // ----------- DELETE -----------
      const deletedIds = oldIds.filter((id) => !newIds.includes(id));

      if (deletedIds.length > 0) {
        await supabase.from("products").delete().in("id", deletedIds);
      }

      // ----------- INSERT -----------
      const toInsert = localProducts.filter((p) => p.isNew);

      if (toInsert.length > 0) {
        await supabase.from("products").insert(
          toInsert.map((p) => ({
            title: p.title,
            price: p.price,
            thumbnail: p.thumbnail,
            description: p.description,
          }))
        );
      }

      // ----------- UPDATE -----------
      const toUpdate = localProducts.filter((p) => !p.isNew);

      for (let p of toUpdate) {
        await supabase
          .from("products")
          .update({
            title: p.title,
            price: p.price,
            thumbnail: p.thumbnail,
            description: p.description,
          })
          .eq("id", p.id);
      }

      // 🔄 RECARREGA LISTA GLOBAL DE PRODUTOS
      await refreshProducts();

      alert("Alterações salvas com sucesso!");

    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Gerenciar Produtos</h2>

      {/* LISTA DE PRODUTOS */}
      <ul>
        {localProducts.map((p) => (
          <li key={p.id} style={{ marginBottom: 20 }}>
            <input
              type="text"
              value={p.title}
              onChange={(e) => handleChange(p.id, "title", e.target.value)}
            />

            <input
              type="number"
              value={p.price}
              onChange={(e) => handleChange(p.id, "price", e.target.value)}
            />

            <input
              type="text"
              value={p.thumbnail}
              onChange={(e) =>
                handleChange(p.id, "thumbnail", e.target.value)
              }
            />

            <input
              type="text"
              value={p.description}
              onChange={(e) =>
                handleChange(p.id, "description", e.target.value)
              }
            />

            <button onClick={() => handleRemove(p.id)}>Remover</button>
          </li>
        ))}
      </ul>

      {/* ADICIONAR PRODUTO */}
      <h3>Adicionar Produto</h3>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Nome"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Preço"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Thumbnail"
          value={newProduct.thumbnail}
          onChange={(e) =>
            setNewProduct({ ...newProduct, thumbnail: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Descrição"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />

        <button type="submit">Adicionar</button>
      </form>

      {/* SUBMIT FINAL */}
      <button
        onClick={handleSubmit}
        style={{ marginTop: 30, padding: 10, fontSize: 18 }}
      >
        SUBMIT
      </button>
    </div>
  );
}
