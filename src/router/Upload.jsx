import styled from "styled-components";
import Button from "../components/elements/Button";
import { useState } from "react";

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
  display: flex;
`;

const Content = styled.div`
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const WordUploadContainer = styled.div`
  /* background-color: yellow; */
  width: 100%;
  height: 480px;
  display: grid;
  gap: 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const WordUploadRow = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  /* background-color: red; */
`;

const WordUploadItem = styled.div`
  /* background-color: orange; */
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonDiv = styled.div`
  width: 100%;
  /* background-color: green; */
`;

const UploadCards = () => {
  return (
    <div>
      <input />
      <input />
    </div>
  );
};

const Upload = () => {
  const [day, setDay] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [setting, setSetting] = useState(true);
  const [wordUploadCards, setWordUploadCards] = useState(null);

  const [lists, setLists] = useState([]);

  const dayInput = (event) => {
    setDay(event.target.value);
  };

  const wordInput = (event) => {
    setWordCount(event.target.value);
  };

  const settingOver = () => {
    if (!day || !wordCount) return;

    setSetting(false);

    const totalWords = day * wordCount;
    const rows = totalWords / 5;
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <div>
            <input onChange={dayInput} value={day} type="number" />
          </div>
          <div>
            <input onChange={wordInput} value={wordCount} type="number" />
          </div>
          <div>
            <button onClick={settingOver}>완료</button>
          </div>
        </Header>
        <Content>
          <WordUploadContainer>
            <WordUploadRow>
              <WordUploadItem>
                <UploadCards />
              </WordUploadItem>
              <WordUploadItem>
                <UploadCards />
              </WordUploadItem>
              <WordUploadItem>
                <UploadCards />
              </WordUploadItem>
              <WordUploadItem>
                <UploadCards />
              </WordUploadItem>
              <WordUploadItem>
                <UploadCards />
              </WordUploadItem>
            </WordUploadRow>
          </WordUploadContainer>
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
