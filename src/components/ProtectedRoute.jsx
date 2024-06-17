import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          })
        );
        setLogin((prev) => ({
          ...prev,
          isLoading: false,
        }));
        //console.log("protected", localStorage.getItem("user"));
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate, setLogin]);

  return children;
};

export default ProtectedRoute;
