import PostCard from './components/PostCard';
import Header from './components/Header';
import styled from 'styled-components';

const AppWrapper = styled.div`
  margin: 0 8%;

  .main {
    &__title {
      font-family: 'Space Grotesk', sans-serif;
      margin: 0;
    }

    &__posts {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
      justify-content: space-between;
      align-items: stretch;

      @media (min-width: 576px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
`;

function App() {
  return (
    <AppWrapper id="app">
      <Header />
      <main className="main">
        <h1 className="main__title">
          <span>#recent-posts</span>
        </h1>
        <div className="main__posts">
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
    </AppWrapper>
  );
}

export default App;
