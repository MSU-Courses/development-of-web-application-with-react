function Header() {
  return (
    <header
      style={{
        display: "flex",
        color: "black",
        padding: "1rem",
        textAlign: "center",
        marginBottom: "2rem",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontFamily: "Space Grotesk",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "1.9rem",
        }}
      >
        blog-app
      </h1>
    </header>
  );
}

export default Header;
