import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f6fa;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1.5fr 3fr;
`;

const Header = styled.div`
  //background-color: blue;
  display: flex;
  justify-content: center;
  align-items: end;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
`;

const Content = styled.div`
  //background-color: red;
  padding-inline: 150px;
  padding-top: 50px;
  padding-bottom: 60px;
`;

const Introduction = styled.div`
  border: 2px solid black;
  border-radius: 15px;
  width: 100%;
  height: 100%;
`;

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>단어 시험 생성기</Title>
        </Header>
        <Content>
          <Introduction></Introduction>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Home;
