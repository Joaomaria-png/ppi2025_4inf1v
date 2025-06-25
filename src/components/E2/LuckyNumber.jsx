import { useState } from 'react';
import styles from './LuckyNumber.module.css';

export  function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(0);

  function handleIncrement() {
    setLuckyNumber((prev) => prev + 1);
  }

  return (
    <div className={styles.container}>
      <h1>Contador = {luckyNumber}</h1>
      <button className={styles.button} onClick={handleIncrement}>
        Incrementar em 1
      </button>
    </div>
  );
}
