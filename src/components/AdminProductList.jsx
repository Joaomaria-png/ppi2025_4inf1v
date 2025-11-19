import { useCart } from "../context/CartContext";
import { useSession } from "../context/SessionContext";

export function AdminProductList() {
  const { products } = useCart();
  const { session } = useSession();
  

  // Verifica se o usuário é admin
  const isAdmin = session?.user?.user_metadata?.admin;

  if (!isAdmin) {
    return <p>Acesso negado. Somente administradores.</p>;
  }

  return (
    <div>
      <h2>Gerenciar Produtos</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - R$ {p.price}
            <button>Editar</button>
            <button>Remover</button>
          </li>
        ))}
      </ul>

      <h3>Adicionar Produto</h3>
      <form>
        <input type="text" placeholder="Nome" />
        <input type="number" placeholder="Preço" />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
