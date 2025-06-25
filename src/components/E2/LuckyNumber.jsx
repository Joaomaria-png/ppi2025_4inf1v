import styles from './LuckyNumber.module.css';
export function LuckyNumber({ number }) {
    var LuckyNumber = 0;
    return(
        <div>
            <h1>
                Contador = {LuckyNumber}
            </h1>
            <button className = {styles.button} onClick>
                Incrementar
            </button>
        </div>
    )
}