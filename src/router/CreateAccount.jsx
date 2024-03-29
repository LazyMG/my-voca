import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/elements/Button";

const Wraapper = styled.div`
  width: 70%;
  height: 70%;
  //background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  gap: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  background-color: red;
  width: 80%;
`;

const EmailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
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
`;

const MessageDiv = styled.div``;

const CreateAccount = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const emailConfirm = (event) => {
    event.preventDefault();
  };

  return (
    <Wraapper>
      <Title>Create Account</Title>
      <Content>
        <Form>
          <EmailDiv>
            <TextBox {...register("email")} type="email" placeholder="Email" />
            <Button onClick={emailConfirm} text="중복확인" size={"S"} />
          </EmailDiv>

          <TextBox
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <TextBox
            {...register("passwordConfirm")}
            type="password"
            placeholder="Password Confirm"
          />
          <ButtonDiv>
            <Button text="가입하기" />
          </ButtonDiv>
        </Form>
        <MessageDiv>로그인</MessageDiv>
      </Content>
    </Wraapper>
  );
};

export default CreateAccount;
