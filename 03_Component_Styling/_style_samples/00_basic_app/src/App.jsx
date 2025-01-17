import PostCard from "./components/PostCard";
import Header from "./components/Header";

function App() {
  return (
    <div id="app">
      <Header />
      <main>
        <h1>#recent-posts</h1>
        <div>
          <PostCard
            title="Hello, World!"
            content="This is my first post"
            date="2025-01-17"
          />
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
