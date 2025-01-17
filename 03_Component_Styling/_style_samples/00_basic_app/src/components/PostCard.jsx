function PostCard({ title, content, date }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>{date}</p>
    </div>
  );
}

export default PostCard;
