import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/elements/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";

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
  padding-top: 70px;
  align-items: center;
  width: 80%;
  gap: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  width: 60%;
  padding-left: 120px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
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

const ErrorSpan = styled.span`
  margin-top: 5px;
  font-size: 14px;
  color: red;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;

const Switcher = styled.div`
  color: black;
  font-weight: 600;
  a {
    color: black;
    text-decoration: none;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const setLogin = useSetRecoilState(loginState);

  const onValid = async (data) => {
    const { email, password } = data;
    //console.log(email, password);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setLogin({
        isLogin: true,
        isLoading: true,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      navigate("/");
    } catch (error) {
      console.log("error");
      setError("password", { message: "로그인 정보가 틀립니다." });
      // console.log(error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Login</Title>
        </Header>
        <ContentWrapper>
          <Content>
            <Form onSubmit={handleSubmit(onValid)}>
              <TextDiv>
                <TextBox
                  {...register("email", {
                    required: {
                      message: "Email을 입력해주세요.",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  required
                />
              </TextDiv>
              <TextDiv>
                <TextBox
                  {...register("password", {
                    required: {
                      message: "Password를 입력해주세요.",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  required
                />
                {errors.password && (
                  <ErrorSpan>{errors.password.message}</ErrorSpan>
                )}
              </TextDiv>

              <ButtonDiv>
                <Button text="Login" />
              </ButtonDiv>
            </Form>
            <Switcher>
              {"Don't have an account? "}
              <Link to="/create-account">Create one &rarr;</Link>
            </Switcher>
          </Content>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
};

export default Login;
