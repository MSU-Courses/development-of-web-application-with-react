import PrimaryButton from "../ui/PrimaryButton";
import styles from "./Hero.module.scss";

import heroImg from "/images/hero.jpg";

function Hero() {
  return (
    <div className={styles.root}>
      <img src={heroImg} className={styles.image} alt="placeholder" />
      <div className={styles.text}>
        <h1>Virtual Zoo</h1>
        <h2>Explore the world of animals</h2>
        <PrimaryButton
          text={"Get Started"}
          className={styles.button}
        />
      </div>
    </div>
  );
}

export default Hero;
