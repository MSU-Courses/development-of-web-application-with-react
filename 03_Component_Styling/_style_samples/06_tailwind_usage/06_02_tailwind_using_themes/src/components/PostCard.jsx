function PostCard({ title, content, date }) {
  return (
    <div className="flex flex-col justify-between gap-2 border border-primary p-4 max-w-96 rounded-lg shadow-md">
      <h2 className="text-2xl m-0 font-serif">{title}</h2>
      <p className="m-0">{content}</p>
      <p className="text-sm text-secondary">{date}</p>
      <a className="text-link decoration-0" href="#">
        Read more ...
      </a>
    </div>
  );
}

export default PostCard;
