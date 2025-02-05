import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import RegisterPage from "./pages/auth/registerPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Routes>
            <Route path="/" element={<RegisterPage />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
