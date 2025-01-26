import { Box, Card, Flex, Heading, Link, Text } from '@radix-ui/themes';

function PostCard({ title, content, date }) {
  return (
    <Box maxWidth="400px" >
      <Card >
        <Flex direction="column" gap="2" padding="4" radius="lg" shadow="md">
          <Heading as="h2">{title}</Heading>
          <Text as="p">{content}</Text>
          <Text as="p" size="1" color='gray'>{date}</Text>
          <Link href="#" color='indigo'>Read more ...</Link>
        </Flex>
      </Card>
    </Box>
  );
}

export default PostCard;
