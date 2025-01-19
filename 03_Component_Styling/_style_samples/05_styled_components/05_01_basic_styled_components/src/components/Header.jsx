import styled from 'styled-components';

const Wrapper = styled.header`
  display: flex;
  color: #252525;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 10px;
  border: 1px solid #666;
  font-family: 'Space Grotesk', sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;

  @media (min-width: 1200px) {
    padding: 1rem;
  }
`;

function Header() {
  return (
    <Wrapper>
      <HeaderTitle>blog-app</HeaderTitle>
    </Wrapper>
  );
}

export default Header;
