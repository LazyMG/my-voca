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
  grid-template-rows: 1.5fr 3fr 0.5fr;
`;

const Header = styled.h1`
  display: flex;
  justify-content: center;
  align-items: end;
  //background-color: green;
`;

const Title = styled.div`
  //background-color: green;
  width: 30%;
  display: flex;
  gap: 10px;
`;

const ProfilePhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: black;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  //background-color: yellow;
`;

const ProfileName = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const ProfileText = styled.div``;

const Content = styled.div`
  padding-inline: 200px;
  padding-top: 60px;
  padding-bottom: 80px;
  //background-color: blue;
`;

const EditDiv = styled.div`
  //background-color: red;
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid black;
  border-radius: 15px;
`;

const Form = styled.div`
  display: grid;
  gap: 30px;
  grid-template-rows: 1.5fr 0.5fr;
  height: 100%;
`;

const FormContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  //background-color: red;
`;

const LeftFormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightFormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextBox = styled.input`
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  font-size: 20px;
  color: #222222;
  //width: 238px;
  width: 70%;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  text-align: center;
  position: relative;
  background: none;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    /* -webkit-box-shadow: ${(props) =>
      props.$autobg === "RANGE"
        ? "0 0 0 30px #f5f6fa inset"
        : "0 0 0 30px #dcdde1 inset"}; */
    -webkit-box-shadow: 0 0 0 30px #fff inset;
    -webkit-text-fill-color: #000;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  width: 100%;
  height: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }

  &:focus {
    outline: none;
    border-color: #1d9bf9;
  }
`;

const AttachFileButton = styled.label`
  width: fit-content;
  height: fit-content;
  padding: 10px 0px;
  color: #1d9bf9;
  text-align: center;
  border-radius: 20px;
  border: 2px solid black;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const FormSubmitDiv = styled.div`
  //background-color: blue;
  display: flex;
  justify-content: end;
  align-items: flex-end;
`;

const ButtonDiv = styled.div`
  //background-color: blue;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftButtonDiv = styled.div`
  width: 50%;
  display: flex;
  gap: 30px;
`;

const RightButtonDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
`;

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onClick = (event) => {
    event.preventDefault();
    navigate("/upload");
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>
            <ProfilePhoto />
            <ProfileDiv>
              <ProfileName>{user?.displayName}</ProfileName>
              <ProfileText>Hello!</ProfileText>
            </ProfileDiv>
          </Title>
        </Header>
        <Content>
          <EditDiv>
            <Form>
              <FormContent>
                <LeftFormContent>
                  <AttachFileButton htmlFor="file">Add photo</AttachFileButton>
                  <AttachFileInput type="file" id="file" accept="image/*" />
                  <TextBox placeholder={user?.displayName} />
                </LeftFormContent>
                <RightFormContent>
                  <TextArea
                    rows={5}
                    maxLength={180}
                    placeholder="What is happening?!"
                    required
                  />
                </RightFormContent>
              </FormContent>
              <FormSubmitDiv>
                <Button text="수정" />
              </FormSubmitDiv>
            </Form>
          </EditDiv>
        </Content>
        <ButtonDiv>
          <LeftButtonDiv>
            {user?.email === "cbfmark@gmail.com" ? (
              <Button onClick={onClick} text="Upload" size={"S"} />
            ) : null}
            {user?.email === "cbfmark@gmail.com" ? (
              <Button onClick={onClick} text="My Word" size={"S"} />
            ) : null}
          </LeftButtonDiv>
          <RightButtonDiv>
            <Button text="View Test" />
          </RightButtonDiv>
        </ButtonDiv>
      </Container>
    </Wrapper>
  );
};

export default Profile;
