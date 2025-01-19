import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid #666;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin: 0;
  color: 'Space Grotesk', sans-serif;
`;

const Content = styled.p`
  margin: 0;
`;

const Date = styled.p`
  font-size: 0.8rem;
  color: #666;
`;

const Link = styled.a`
  color: blue;
  text-decoration: none;
`;

function PostCard({ title, content, date }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Date>{date}</Date>
      <Link href="#">Read more ...</Link>
    </Wrapper>
  );
}

export default PostCard;
