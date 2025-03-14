import Navigation from "../Navigation";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.root}>
      <h1>virtual zoo</h1>
      <Navigation />
      <button className={styles.button}>Login</button>
    </header>
  );
}

export default Header;
