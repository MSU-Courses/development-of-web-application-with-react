function PostCard({ title, content, date }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "10px",
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "10px",
        maxWidth: "400px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{ margin: "0", fontSize: "1.4rem", fontFamily: "Space Grotesk" }}
      >
        {title}
      </h2>
      <p style={{ margin: "0" }}>{content}</p>
      <p style={{ fontSize: "0.8rem", color: "#666" }}>{date}</p>
      <a href="#" style={{ color: "blue", textDecoration: "none" }}>
        Read more ...
      </a>
    </div>
  );
}

export default PostCard;
