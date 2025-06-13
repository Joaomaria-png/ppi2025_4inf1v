import styles from "../components/MyHeader.module.css";
import img from "../imgs/LOGO-ANIMAL-ELETRO.png";

export function MyHeader() {
  return (
      <header className={styles.header1}>
        <img className={styles.img} src={img} />
        <h1 className={styles.title}>ANIMAL ELETRO</h1>
      </header>
  );
}