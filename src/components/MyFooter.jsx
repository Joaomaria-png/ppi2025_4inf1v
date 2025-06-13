import styles from "../components/MyFooter.module.css";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Phone } from "lucide-react";
export function Myfooter() {
  return (
      <footer className={styles.footer}>
        <p className={styles.text}>IFRN - Campus Macau
        <br/>Curso Tecnico em informatica
        <br/>Programação para a internet 2025</p>
        <p className = {styles.assinatura}>Joao maria de lima pereira neto</p>
        <div className={styles.icons}>
          <Facebook />
          <Instagram />
          <Phone />
        </div>
      </footer>
  );
}