import React from 'react';
import styles from './ProductForm.module.css';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação

const ProductForm = ({ productToEdit, onSave }) => {
  // ... seu estado e lógica de formulário ...
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... sua lógica de salvar o produto ...
    alert("Produto salvo com sucesso!");
    navigate('/products/admin'); // Redireciona após salvar
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      {/* ... seu formulário ... */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* ... campos do formulário ... */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>Salvar</button>
          {/* Botão para voltar */}
          <button type="button" onClick={() => navigate('/products/admin')} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;