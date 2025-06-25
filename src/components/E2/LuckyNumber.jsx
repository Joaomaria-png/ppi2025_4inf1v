import { useState } from 'react';
import styles from './LuckyNumber.module.css';

export  function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(0);

  function handleIncrement() {
    setLuckyNumber((prev) => prev + 1);
  }

  return (
    <div>
      <h1>Contador = {luckyNumber}</h1>
      <button className={styles.button} onClick={handleIncrement}>
        Incrementar
      </button>
    </div>
  );
}
