import styled from "styled-components";
import Button from "../components/elements/Button";
import { useNavigate } from "react-router-dom";

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
  display: flex;
  justify-content: center;
  align-items: end;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
`;

const Content = styled.div`
  padding-inline: 150px;
  padding-top: 50px;
  padding-bottom: 60px;
`;

const Introduction = styled.div`
  border: 2px solid black;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  padding-inline: 90px;
  padding-block: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Row = styled.div`
  /* background-color: red; */
  width: 100%;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

const Home = () => {
  const navigate = useNavigate();

  const gotoWordPage = () => {
    navigate("/word");
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>단어 시험 생성기</Title>
        </Header>
        <Content>
          <Introduction>
            <Row>Step 1. 시험 범위 선택</Row>
            <Row>Step 2. 시험 종류 및 매수 선택</Row>
            <Row>Step 3. 시험지 확인 및 출력</Row>
            <Button onClick={gotoWordPage} text="시험지 만들기" />
          </Introduction>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Home;
