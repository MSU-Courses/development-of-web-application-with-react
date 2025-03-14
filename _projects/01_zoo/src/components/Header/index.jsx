import Navigation from "../Navigation";
import PrimaryButton from "../ui/PrimaryButton";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.root}>
      <h1>virtual zoo</h1>
      <Navigation />
      <PrimaryButton text={"Login"} />
    </header>
  );
}

export default Header;
