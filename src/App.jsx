import styled from "styled-components";
import Section from "./components/Section.jsx";
import { Reset } from "styled-reset";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./router/Home.jsx";
import Profile from "./router/Profile.jsx";
import Word from "./router/Word.jsx";
import Upload from "./router/Upload.jsx";
import Login from "./router/Login.jsx";
import CreateAccount from "./router/CreateAccount.jsx";
import UserWord from "./router/UserWord.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
  gap: 80px;
  background-color: red;
  width: 1280px;
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
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/create-account",
    element: (
      <Layout>
        <CreateAccount />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <Reset />
      <Page>
        <Content>
          <Section />
        </Content>
      </Page>
    </>
  );
}

export default App;
