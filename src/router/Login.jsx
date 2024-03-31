import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
  width: 70%;
  height: 70%;
  //background-color: blue;
  display: flex;
  flex-direction: column;
  //justify-content: space-around;
  align-items: center;
  gap: 120px;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  //background-color: red;
  padding-top: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  width: 80%;
  gap: 30px;
  //background-color: green;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  gap: 40px;
  //background-color: red;
  width: 60%;
  padding-left: 80px;
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

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  return (
    <Wrapper>
      <Container>
        <Title>Login</Title>
        <Content>
          <Form>
            <TextBox {...register("email")} type="email" placeholder="Email" />
            <TextBox
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <ButtonDiv>
              <Button text="Login" />
            </ButtonDiv>
          </Form>
          <Switcher>
            {"Don't have an account? "}
            <Link to="/create-account">Create one &rarr;</Link>
          </Switcher>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Login;
