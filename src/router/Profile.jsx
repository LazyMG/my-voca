import styled from "styled-components";
import Button from "../components/elements/Button";
import { useEffect, useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRecoilState } from "recoil";
import { testState, userState } from "../atoms";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import UserWords from "../components/Word/UserWords";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
`;

const Title = styled.div`
  width: 30%;
  display: flex;
  gap: 10px;
  position: relative;
`;

const ProfilePhoto = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #e8e8e8;
  background: ${({ $imgUrl }) => ($imgUrl ? `url(${$imgUrl})` : null)};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ProfileDiv = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProfileName = styled.div`
  font-size: 33px;
  font-weight: bold;
`;

const ProfileText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  padding-inline: 150px;
  padding-top: 60px;
  padding-bottom: 80px;
`;

const EditDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 15px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const TextArea = styled.input`
  border: 2px solid white;
  padding: 15px;
  border-radius: 20px;
  font-size: 16px;
  color: black;
  background-color: #ededed;
  border-color: #ededed;
  width: 100%;
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
  position: absolute;
  bottom: -40px;
  left: 15px;
  width: fit-content;
  height: fit-content;
  padding: 10px 15px;
  color: white;
  text-align: center;
  border-radius: 20px;
  border: 1px solid black;
  font-size: 14px;
  font-weight: 600;

  background-color: black;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const FormSubmitDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const PrintDiv = styled.div`
  display: none;
`;

const Profile = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState();
  const [photoURL, setPhotoURL] = useState("");
  const [isFileUploading, setIsFileUploading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
      const userDoc = snapshot.docs[0];
      const dbUser = snapshot.docs.map((doc) => {
        const {
          userId,
          username,
          photoURL,
          introduce,
          myWordList,
        } = doc.data();
        return {
          docId: userDoc.id,
          userId,
          username,
          photoURL,
          introduce,
          myWordList,
        };
      });
      setUser(...dbUser);
      setPhotoURL(dbUser[0].photoURL);
      setTestData({
        meanList: dbUser[0].myWordList.meanList,
        wordList: dbUser[0].myWordList.wordList,
        currentPage: dbUser[0].myWordList.currentPage,
      });
      setValue("username", dbUser[0]?.username);
      setValue("introduce", dbUser[0]?.introduce);
    };
    fetchUser();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!JSON.stringify(testData) === "{}") {
      setIsLoading(false);
    }
  }, [testData]);

  const onValid = async (data) => {
    const userDocRef = doc(db, "users", user.docId);

    let updateData = {
      username: data.username || user.username,
      introduce: data.introduce,
    };

    if (file) {
      const locationRef = ref(storage, `avatars/${user?.userId}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      updateData.photoURL = avatarUrl;
    }

    await updateDoc(userDocRef, updateData);

    setUser((prev) => ({
      ...prev,
      ...updateData,
    }));
  };

  const changePhotoFile = async (event) => {
    const { files } = event.target;
    if (files && files.length === 1) {
      setIsFileUploading(true);
      const userFile = files[0];
      const locationRef = ref(storage, `avatars/${user?.userId}temp`);
      const result = await uploadBytes(locationRef, userFile);
      const avatarUrl = await getDownloadURL(result.ref);
      setPhotoURL(avatarUrl);
      setFile(userFile);
      setIsFileUploading(false);
    }
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
            <ProfilePhoto $imgUrl={photoURL} />
            <ProfileDiv>
              <ProfileName>{localUser?.username || user?.username}</ProfileName>
              <ProfileText>{user?.introduce}</ProfileText>
            </ProfileDiv>
            <AttachFileButton htmlFor="file">
              {isFileUploading ? "Uploading.." : "Edit photo"}
            </AttachFileButton>
            <AttachFileInput
              onChange={changePhotoFile}
              type="file"
              id="file"
              accept="image/*"
            />
          </Title>
        </Header>
        <Content>
          <EditDiv>
            <Form>
              <FormContent>
                <TextArea
                  {...register("username", { required: true })}
                  placeholder="닉네임을 수정해요!"
                  type="text"
                />
                <TextArea
                  {...register("introduce", {
                    maxLength: 40,
                  })}
                  placeholder="소개말을 수정해요!"
                  type="text"
                />
              </FormContent>
              <FormSubmitDiv>
                <Button onClick={handleSubmit(onValid)} text="수정" />
                <Button isPrint={true} onClick={printPage} text="View Test" />
              </FormSubmitDiv>
            </Form>
          </EditDiv>
        </Content>
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
