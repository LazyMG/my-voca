import styled from "styled-components";
import Button from "../components/elements/Button";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { testState, userState } from "../atoms";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import UserWords from "../components/Word/UserWords";

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
    border-color: black;
  }
`;

const AttachFileButton = styled.label`
  width: fit-content;
  height: fit-content;
  padding: 10px 0px;
  color: black;
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

const PrintDiv = styled.div`
  display: none;
`;

const Profile = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [testData, setTestData] = useRecoilState(testState);

  const componentRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", localUser?.uid)
      );
      const snapshot = await getDocs(userQuery);
      const dbUser = snapshot.docs.map((doc) => {
        const { userId, username, photo, introduce, myWordList } = doc.data();
        return {
          userId,
          username,
          photo,
          introduce,
          myWordList,
        };
      });
      //console.log("dbUser", dbUser[0].myWordList);
      setUser(...dbUser);
      setTestData({
        meanList: dbUser[0].myWordList.meanList,
        wordList: dbUser[0].myWordList.wordList,
        currentPage: dbUser[0].myWordList.currentPage,
      });
    };
    fetchUser();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!JSON.stringify(testData) === "{}") {
      setIsLoading(false);
    }
  }, [testData]);

  const editProfile = (event) => {
    event.preventDefault();
  };

  const onValid = (data) => {
    console.log(data);
  };

  const printPage = () => {
    if (isLoading) return;
    handlePrint();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Voca Test",
    removeAfterPrint: true,
  });

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>
            <ProfilePhoto />
            <ProfileDiv>
              <ProfileName>{user?.username}</ProfileName>
              <ProfileText>{user?.introduce}</ProfileText>
            </ProfileDiv>
          </Title>
        </Header>
        <Content>
          <EditDiv>
            <Form onSubmit={handleSubmit(onValid)}>
              <FormContent>
                <LeftFormContent>
                  <AttachFileButton htmlFor="file">Add photo</AttachFileButton>
                  <AttachFileInput type="file" id="file" accept="image/*" />
                  <TextBox
                    {...register("username")}
                    placeholder={user?.username}
                  />
                </LeftFormContent>
                <RightFormContent>
                  <TextArea
                    {...register("introduce")}
                    rows={5}
                    maxLength={180}
                    placeholder="What is happening?!"
                    required
                  />
                </RightFormContent>
              </FormContent>
              <FormSubmitDiv>
                <Button onClick={editProfile} text="수정" />
              </FormSubmitDiv>
            </Form>
          </EditDiv>
        </Content>
        <ButtonDiv>
          <Button onClick={printPage} text="View Test" />
        </ButtonDiv>
      </Container>
      {!isLoading ? (
        <PrintDiv>
          <UserWords
            forPrintRef={componentRef}
            meanList={testData?.meanList}
            wordList={testData?.wordList}
            currentPage={testData?.currentPage}
          />
        </PrintDiv>
      ) : null}
    </Wrapper>
  );
};

export default Profile;
