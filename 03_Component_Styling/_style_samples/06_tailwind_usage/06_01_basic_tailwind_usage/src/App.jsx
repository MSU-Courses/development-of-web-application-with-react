import PostCard from './components/PostCard';
import Header from './components/Header';

function App() {
  return (
    <div id="app" className="my-0 mx-2 max-w-7xl">
      <Header />
      <main>
        <h1 className="text-3xl font-semibold font-serif py-3">
          <span>#recent-posts</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 items-stretch sm:grid-cols-2 lg:grid-cols-3">
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
