/**
 * Theme configuration
 */
export const theme = {
  colors: {
    primary: '#252525',
    extra: '#666',
    background: '#f0f0f0',
  },

  fonts: {
    heading: 'Space Grotesk',
    body: 'Inter',
  },

  breakpoints: {
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
  },
};

export const mediaQueries = (key) => {
  return (style) => `@media (min-width: ${theme.breakpoints[key]}) { ${style} }`;
};
