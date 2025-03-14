import styles from "./PrimaryButton.module.scss";

function PrimaryButton({
  text,
  padding = { x: "20px", y: "10px" },
  bgColor = "#006400",
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
