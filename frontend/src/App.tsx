import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage.tsx";
import AuthCallback from "./pages/AuthCallback/AuthCallback.tsx";
import "./App.css";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./Layout/MainLayout.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpFallbackRedirectUrl={`/auth-callback`} />}/>
        <Route path="/auth-callback" element={<AuthCallback />}/>

        <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage />}/>
            
        </Route>
      </Routes>
    </>
  )
}

export default App
