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

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onClick = () => {
    navigate("/upload");
  };

  return (
    <Wrapper>
      Profile
      {user?.displayName}
      {user?.email === "cbfmark@gmail.com" ? (
        <Button onClick={onClick} text="Upload" />
      ) : null}
    </Wrapper>
  );
};

export default Profile;
