import styled from "styled-components";
import { Reset } from "styled-reset";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./router/Home.jsx";
import Profile from "./router/Profile.jsx";
import Word from "./router/Word.jsx";
import Login from "./router/Login.jsx";
import CreateAccount from "./router/CreateAccount.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { auth, db } from "./firebase.js";
import { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { wordList } from "./voca/voca.js";

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
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "word",
        element: <Word />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Profile />,
      },
    ],
  },
]);

const saveWordListToFirestore = async () => {
  const documentData = {
    title: "vocaTest",
    vocaId: "test",
    language: "english",
    wordList: wordList,
  };

  try {
    const docRef = await addDoc(collection(db, "voca"), documentData);
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    // console.error("Error adding document: ", e);
  }
};

//saveWordListToFirestore();

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
