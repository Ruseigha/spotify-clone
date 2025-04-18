import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage/HomePage.tsx";
import AuthCallback from "./pages/AuthCallback/AuthCallback.tsx";
import "./App.css";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./Layout/MainLayout.tsx";
import ChatPage from "./pages/Chart/ChatPage.tsx";
import AlbumPage from "./pages/Album/AlbumPage.tsx";
import AdminPage from "./pages/Admin/AdminPage.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpFallbackRedirectUrl={`/auth-callback`} />}/>
        <Route path="/auth-callback" element={<AuthCallback />}/>
        <Route path="/admin" element={<AdminPage />}/>

        <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/chat" element={<ChatPage />}/>
          <Route path="/album/:albumId" element={<AlbumPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
