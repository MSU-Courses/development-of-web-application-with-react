import { Box, Heading } from '@radix-ui/themes';

function Header() {
  return (
    <Box as="header" className="p-5 mb-8 rounded-lg border border-primary shadow-md">
      <Heading as="h1" size={'8'}>
        blog-app
      </Heading>
    </Box>
  );
}

export default Header;
