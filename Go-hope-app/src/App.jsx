import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import RegisterPage from "./pages/auth/registerPage";
import WelcomePage from "./pages/welcome/welcomePage";
import VerificationPage from "./pages/welcome/verificationPage";
import Home from "./pages/home/homePage";
import "./app.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
