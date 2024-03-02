import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout'
import LoadingScreen from './components/loadingScreen'
import Home from './routes/home'
import Profile from './routes/profile'
import CreateAccount from './routes/createAccount'
import Login from './routes/login'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { useEffect, useState } from 'react'
import { auth } from './routes/firebase'
import ProtectedRoute from './components/protected-route'
import EmailResetPassword from './routes/emailResetPassword'

const router=createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute>
      <Layout />
    </ProtectedRoute>),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/createAccount",
    element: <CreateAccount />
  },
  {
    path: "/emailResetPassword",
    element: <EmailResetPassword />
  }
]);
const GlobalStyles = createGlobalStyle`
${reset};
* {
  box-sizing: border-box;
  background-color: black;
  color: white;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const Wrapper=styled.div`
height: 100vh;
display: flex;
justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading]= useState(true);
  const init=async ()=>{
    await auth.authStateReady();
    setIsLoading(false)
  };
  useEffect(()=> {
    init();
  },[]);
  return <Wrapper>
  <GlobalStyles />
  {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
  </Wrapper>
}

export default App
