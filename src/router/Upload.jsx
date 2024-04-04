import styled from "styled-components";
import Button from "../components/elements/Button";

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
  padding: 40px;
  display: grid;
  grid-template-rows: 1fr 3fr;
  gap: 15px;
`;

const Header = styled.div`
  background-color: red;
  display: flex;
`;

const Content = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const WordUploadContainer = styled.div`
  background-color: yellow;
  width: 100%;
  display: grid;
`;

const WordUploadRow = styled.div``;

const WordUploadItem = styled.div``;

const ButtonDiv = styled.div`
  width: 100%;
  background-color: green;
`;

const Upload = () => {
  return (
    <Wrapper>
      <Container>
        <Header></Header>
        <Content>
          <WordUploadContainer></WordUploadContainer>
          <ButtonDiv>
            <Button text="취소" />
            <Button text="Upload" />
          </ButtonDiv>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Upload;
