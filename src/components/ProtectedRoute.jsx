import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

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
      } else {
        navigate("/login");
      }
    });

    // useEffect 내부에서 구독 해제 함수를 반환하여 정리(clean-up)를 수행합니다.
    return () => unsubscribe();
  }, [navigate]); // useEffect가 마운트 및 언마운트 시에만 실행되도록 빈 배열을 전달합니다.

  return children;
};

export default ProtectedRoute;
