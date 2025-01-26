import PostCard from './components/PostCard';
import Header from './components/Header';

import styles from './App.module.css';

function App() {
  return (
    <div id="app" className={styles.app}>
      <Header />
      <main>
        <h1 className={styles.title}>
          <span>#recent-posts</span>
        </h1>
        <div className={styles.posts}>
          <PostCard title="Hello, World!" content="This is my first post" date="2025-01-17" />
          <PostCard
            title="React Props"
            content="Learn how to use props in React"
            date="2025-01-17"
          />
          <PostCard
            title="React Components"
            content="Explore the world of React components"
            date="2025-01-17"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
