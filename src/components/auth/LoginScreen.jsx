import React, { useState } from 'react';
import styles from './LoginScreen.module.css';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa o hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de lógica de login
    console.log('E-mail:', email);
    console.log('Senha:', password);
    alert('Login bem-sucedido (simulado)!');
    
    // Redireciona para a tela de gerenciamento de produtos
    navigate('/products/admin'); 
  };

  return (
    <div className={styles.container}>
      {/* ... seu formulário continua o mesmo ... */}
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Entrar</button>
      </form>
      <p className={styles.linkText}>
        Não tem uma conta? <a href="/register" className={styles.link}>Cadastre-se</a>
      </p>
    </div>
  );
};

export default LoginScreen;