import "../styles/components/PostCard.css";

function PostCard({ title, content, date }) {
  return (
    <div className="post-card">
      <h2 className="post-card__title">{title}</h2>
      <p className="post-card__content">{content}</p>
      <p className="post-card__date">{date}</p>
      <a className="post-card__link" href="#">
        Read more ...
      </a>
    </div>
  );
}

export default PostCard;
