import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductListAdmin.css';
import { CartContext } from '../../service/CartContext';

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { products: contextProducts } = useContext(CartContext);

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Mescla os produtos do contexto com os do localStorage
    const allProducts = [...contextProducts, ...localProducts.filter(lp => !contextProducts.some(cp => cp.id === lp.id))];
    setProducts(allProducts);
  }, [contextProducts]);

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja remover este produto?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);

      // Remove apenas do localStorage
      const localProducts = JSON.parse(localStorage.getItem('products')) || [];
      const filteredLocal = localProducts.filter(p => p.id !== productId);
      localStorage.setItem('products', JSON.stringify(filteredLocal));
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/products/admin/edit/${productId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gerenciar Produtos</h2>
        <Link to="/products/admin/add" className={styles.addButton}>Adicionar Novo Produto</Link>
      </div>

      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product.id} className={styles.productCard}>
            <img
              src={product.imageUrl || product.thumbnail || 'https://via.placeholder.com/150'}
              alt={product.name || product.title}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name || product.title}</h3>
              <p className={styles.productPrice}>R$ {parseFloat(product.price).toFixed(2)}</p>
              <p className={styles.productDescription}>{product.description}</p>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={() => handleEditProduct(product.id)} className={styles.editButton}>Editar</button>
              <button onClick={() => handleDeleteProduct(product.id)} className={styles.deleteButton}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListAdmin;
