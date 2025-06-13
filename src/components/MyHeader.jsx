import styles from "../components/MyHeader.module.css";
export function MyHeader() {
  return (

      <header className={styles.header1}>
        <img src="../imgs/LOGO-ANIMAL-ELETRO.png"/>
        <h1>Meus Produtos</h1>
      </header>
  );
}