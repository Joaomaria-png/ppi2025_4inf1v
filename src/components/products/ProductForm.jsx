import React, { useState, useEffect, useContext } from 'react';
import styles from './ProductForm.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../service/CartContext';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { products: contextProducts } = useContext(CartContext);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (isEditing) {
      const localProducts = JSON.parse(localStorage.getItem('products')) || [];
      const foundLocal = localProducts.find(p => p.id === parseInt(id));

      if (foundLocal) {
        setProduct(foundLocal);
        return;
      }

      const foundContext = contextProducts.find(p => p.id === parseInt(id));
      if (foundContext) {
        setProduct({
          name: foundContext.name || foundContext.title || '',
          description: foundContext.description || '',
          price: foundContext.price || '',
          imageUrl: foundContext.imageUrl || foundContext.thumbnail || ''
        });
        return;
      }

      // Se tiver API, aqui seria o lugar para buscar por ID
      // fetch(`URL_DA_API/${id}`).then(...);
    }
  }, [id, isEditing, contextProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const localProducts = JSON.parse(localStorage.getItem('products')) || [];

    if (isEditing) {
      const updatedProducts = localProducts.map(p =>
        p.id === parseInt(id) ? { ...product, id: parseInt(id) } : p
      );

      // Se o produto não estiver no localStorage, adiciona ele
      const exists = updatedProducts.some(p => p.id === parseInt(id));
      if (!exists) {
        updatedProducts.push({ ...product, id: parseInt(id) });
      }

      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } else {
      const newProduct = { ...product, id: Date.now() };
      localStorage.setItem('products', JSON.stringify([...localProducts, newProduct]));
    }

    alert("Produto salvo com sucesso!");
    navigate('/products/admin');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="name" value={product.name} onChange={handleChange} placeholder="Nome" required />
        <input name="description" value={product.description} onChange={handleChange} placeholder="Descrição" required />
        <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Preço" required />
        <input name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="URL da Imagem" required />
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>Salvar</button>
          <button type="button" onClick={() => navigate('/products/admin')} className={styles.cancelButton}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
