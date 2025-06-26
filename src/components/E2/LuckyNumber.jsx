import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(null);
  const [blacklist, setBlacklist] = useState([]);
  const [isRepeated, setIsRepeated] = useState(false);

  function handleLuckyNumber() {
    const newNumber = Math.floor(Math.random() * 32) + 1;

    setLuckyNumber(newNumber);

    if (blacklist.includes(newNumber)) {
      setIsRepeated(true);
    } else {
      setIsRepeated(false);

      setBlacklist((prevBlacklist) => [...prevBlacklist, newNumber]);
    }
  }

  function handleRestart() {
    setLuckyNumber(null);
    setBlacklist([]);
    setIsRepeated(false);
  }

  return (
    <div className={styles.container}>
      {luckyNumber !== null ? (
        isRepeated ? (
          <h1>🎉 GRANDE SORTE! Seu número da sorte é {luckyNumber} 🎉</h1>
        ) : (
          <h1>Lucky Number = {luckyNumber}</h1>
        )
      ) : (
        <h1>Lucky Number 🎲</h1>
      )}
      {!isRepeated && (
        <button className={styles.button} onClick={handleLuckyNumber}>
          Random
        </button>
      )}

      {isRepeated && (
        <button className={styles.button} onClick={handleRestart}>
          Recomeçar
        </button>
      )}
      {
        <div>
          <h3>Numeros já sorteados:</h3>
          <ul>
            {blacklist.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}
