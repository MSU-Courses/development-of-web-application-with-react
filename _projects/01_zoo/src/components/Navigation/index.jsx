import styles from "./Navigation.module.scss";

function Navigation() {
  return (
    <nav className={styles.root}>
      <ul className={styles.list}>
        <li>
          <a href="#">Animals</a>
        </li>
        <li>
          <a href="#">Exhibits</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
