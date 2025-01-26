import PostCard from './components/PostCard';
import Header from './components/Header';
import { Container, Grid, Heading, Section, Text } from '@radix-ui/themes';

function App() {
  return (
    <Container id="app">
      <Header />
      <main>
        <Heading as="h2" mb="2" size="7">
          <Text as="span">#recent-posts</Text>
        </Heading>
        <Grid
          as="div"
          className="posts"
          columns={{ initial: '1', md: '2', lg: '3' }}
          rows="repeat(3, auto)"
          gap="3"
          width="auto">
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
        </Grid>
      </main>
    </Container>
  );
}

export default App;
