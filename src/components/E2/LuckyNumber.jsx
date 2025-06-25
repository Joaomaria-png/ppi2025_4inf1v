import { useState } from 'react';
import styles from './LuckyNumber.module.css';

export function LuckyNumber() {
    // React HOOK - useState()
    const [luckyNumber, setLuckyNumber] = useState(0);
    function handleLuckyNumber() {
        setLuckyNumber(Math.ceil(Math.random() * 31));
        // O valor atualizado só estará disponível no próximo render
        console.log(`LuckyNumber atualizado: valor será atualizado`);
        let history = [];
        history.push(luckyNumber);
        console.log('Histórico de Lucky Numbers:', history);
    }
    function handleIncrement() {
        setLuckyNumber((prev) => prev + 1);
        console.log(`LuckyNumber atualizado: valor será atualizado`);
    }
    function handleDecrement() {
        setLuckyNumber((prev) => prev - 1);
        console.log(`LuckyNumber atualizado: valor será atualizado`);
    }
    function handleZero() {
        setLuckyNumber(0);
        console.log(`LuckyNumber atualizado: 0`);
    }

    return (
        <div className={styles.container}>
            {LuckyNumber ? (
                <h1>Lucky Number = {luckyNumber}</h1>
            ):
            (
                <h1>Lucky Number 🎲</h1>
            )}

            <button className={styles.button} onClick={handleLuckyNumber}>
                Random
            </button>
            <button className={styles.button} onClick={handleIncrement}>
                + 1
            </button>
            <button className={styles.button} onClick={handleDecrement}>
                - 1
            </button>
            <button className={styles.button} onClick={handleZero}>
                = 0
            </button>
        </div>
    );
}
