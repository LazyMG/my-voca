import styled from "styled-components";
import { Reset } from "styled-reset";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./router/Home.jsx";
import Profile from "./router/Profile.jsx";
import Word from "./router/Word.jsx";
import Upload from "./router/Upload.jsx";
import Login from "./router/Login.jsx";
import CreateAccount from "./router/CreateAccount.jsx";
import UserWord from "./router/UserWord.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { auth } from "./firebase.js";
import { useEffect } from "react";

const Page = styled.div`
  background-color: #7f8fa6;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  background-color: red;
  width: 1100px;
  height: 800px;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "word",
        element: <Word />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "user/:uid",
        element: <UserWord />,
      },
    ],
  },
  {
    path: "/login",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/create-account",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <CreateAccount />,
      },
    ],
  },
]);

function App() {
  const init = async () => {
    await auth.authStateReady();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Reset />
      <Page>
        <RouterProvider router={router} />
      </Page>
    </>
  );
}

export default App;
