import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage.tsx";
import AuthCallback from "./pages/AuthCallback/AuthCallback.tsx";
import "./App.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/auth-callback" element={<AuthCallback />}/>
      </Routes>
    </>
  )
}

export default App
