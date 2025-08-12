import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductListAdmin.css';

// Dados de exemplo
const initialProducts = [
  { id: 1, name: 'Camiseta', description: 'Camiseta de algodão', price: 29.99, imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Calça Jeans', description: 'Calça jeans slim fit', price: 79.90, imageUrl: 'https://via.placeholder.com/150' },
];

const ProductListAdmin = () => {
  const [products, setProducts] = useState(initialProducts);
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja remover este produto?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleEditProduct = (productId) => {
    // Redireciona para a rota de edição com o ID do produto
    navigate(`/products/admin/edit/${productId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gerenciar Produtos</h2>
        {/* Link para a tela de adicionar novo produto */}
        <Link to="/products/admin/add" className={styles.addButton}>Adicionar Novo Produto</Link>
      </div>
      
      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product.id} className={styles.productItem}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <div className={styles.productDetails}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>
            </div>
            <div className={styles.buttonGroup}>
              {/* Botão para editar, usando a função que navega */}
              <button onClick={() => handleEditProduct(product.id)} className={styles.editButton}>Editar</button>
              {/* Botão para remover */}
              <button onClick={() => handleDeleteProduct(product.id)} className={styles.deleteButton}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListAdmin;