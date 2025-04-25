import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/elements/Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
  display: grid;
  grid-template-rows: 1.5fr 3fr;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  gap: 30px;
  /* background-color: yellow; */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  width: 60%;
  padding-left: 120px;
  padding-top: 20px;
  /* background-color: red; */
`;

const EmailDiv = styled.div`
  display: flex;
  //justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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

  /* background-color: blue; */
`;

const ErrorSpan = styled.span`
  font-size: 16px;
  color: red;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
  //background-color: blue;
`;

const Switcher = styled.div`
  color: black;
  font-weight: 600;
  a {
    color: black;
    text-decoration: none;
  }
`;

const CreateAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [isEmailChecked, setEmailChecked] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const isExistEmail = async () => {
    const email = emailInput || getValues("email");
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const snapshot = await getDocs(userQuery);
    const userDoc = snapshot.docs[0];
    if (userDoc) return true;
    else return false;
  };

  const emailConfirm = async (event) => {
    event.preventDefault();
    const result = await isExistEmail();
    //email 체크
    if (result) {
      alert("이미 존재하는 이메일입니다.");
      setValue("email", "");
      setEmailInput("");

      return;
    } else {
      alert("사용가능한 이메일입니다.");
      setEmailChecked(true);
    }
  };

  const onValid = async (data) => {
    const { email, password, passwordConfirm, username } = data;
    //email 체크
    //console.log(isEmailChecked);

    if (!isEmailChecked) {
      alert("이메일 확인이 필요합니다.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
      return;
    }
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, {
        displayName: username,
        providerData: "Hello!",
      });
      await addDoc(collection(db, "users"), {
        email,
        password,
        createdAt: Date.now(),
        username: username || "Anonymous",
        userId: credentials.user.uid,
        introduce: "Hello!",
        wordList: {},
        photoURL: "",
      });
      navigate("/login");
    } catch (error) {
      setError("password", { message: error.message });
    }
  };

  const changeEmailInput = (event) => {
    setEmailInput(event.target.value);
    setEmailChecked(false);
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Create Account</Title>
        </Header>
        <ContentWrapper>
          <Content>
            <Form onSubmit={handleSubmit(onValid)}>
              <EmailDiv>
                <TextBox
                  {...register("email", {
                    required: {
                      message: "Email을 입력해주세요.",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  value={emailInput}
                  onChange={changeEmailInput}
                />
                <Button onClick={emailConfirm} text="Check" size={"S"} />
              </EmailDiv>
              <TextDiv>
                <TextBox
                  {...register("username", {
                    required: {
                      message: "Username을 입력해주세요.",
                    },
                    maxLength: {
                      value: 10,
                      message: "Username의 길이는 10자 이내입니다.",
                    },
                  })}
                  type="text"
                  placeholder="Username"
                />
                <ErrorSpan>{errors?.username?.message}</ErrorSpan>
              </TextDiv>
              <TextDiv>
                <TextBox
                  {...register("password", {
                    required: {
                      message: "Password를 입력해주세요.",
                    },
                    minLength: {
                      value: 4,
                      message: "Password의 길이는 4자 이상입니다.",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                />
                <ErrorSpan>{errors?.password?.message}</ErrorSpan>
              </TextDiv>
              <TextDiv>
                <TextBox
                  {...register("passwordConfirm", {
                    required: {
                      message: "Password 확인이 필요합니다.",
                    },
                    minLength: {
                      value: 4,
                      message: "Password의 길이는 4자 이상입니다.",
                    },
                  })}
                  type="password"
                  placeholder="Password Confirm"
                />
                <ErrorSpan>{errors?.passwordConfirm?.message}</ErrorSpan>
              </TextDiv>

              <ButtonDiv>
                <Button text="Sign In" />
              </ButtonDiv>
            </Form>
            <Switcher>
              {"Already have an account? "}
              <Link to="/login">Login &rarr;</Link>
            </Switcher>
          </Content>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
};

export default CreateAccount;
