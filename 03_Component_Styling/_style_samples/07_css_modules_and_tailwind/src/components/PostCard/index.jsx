import styles from './PostCard.module.css';

function PostCard({ title, content, date }) {
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
      <p className={styles.date}>{date}</p>
      <a className={styles.link} href="#">
        Read more ...
      </a>
    </div>
  );
}

export default PostCard;
