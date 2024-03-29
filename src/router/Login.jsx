import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wraapper = styled.div`
  width: 70%;
  height: 70%;
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  return (
    <Wraapper>
      <div>타이틀</div>
      <Form>
        <input {...register("email")} type="email" placeholder="Email" />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <div>
          <input type="submit" value="로그인" />
        </div>
      </Form>
      <div>계정 만들기</div>
    </Wraapper>
  );
};

export default Login;
