import styled from 'styled-components';
import { mediaQueries } from '../styles/theme/theme';

const Wrapper = styled.header`
  display: flex;
  color: ${(props) => props.theme.colors.primary};
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.extra};
  font-family: ${(props) => props.theme.fonts.heading};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  & h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  ${mediaQueries('lg')`
    & h1 {
      padding: 1rem;
    }
  `}
`;

function Header() {
  return (
    <Wrapper>
      <h1>blog-app</h1>
    </Wrapper>
  );
}

export default Header;
