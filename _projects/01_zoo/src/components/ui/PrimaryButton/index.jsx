import styles from "./PrimaryButton.module.scss";

function PrimaryButton({
  text,
  className = "",
}) {
  return (
    <button
      className={`${styles.button} ${className}`}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;
