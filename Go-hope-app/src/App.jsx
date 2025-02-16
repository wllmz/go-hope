import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import RegisterPage from "./pages/auth/registerPage";
import WelcomePage from "./pages/welcome/welcomePage";
import VerificationPage from "./pages/welcome/verificationPage";
import Home from "./pages/home/homePage";
import "./app.css";
import PrivateRoute from "./context/PrivateRoute";
import Login from "./pages/auth/loginPage";
import ArticlePage from "./pages/article/articlePage";
import CategoriesPage from "./pages/article/categoriePage";
import ArticleByidPage from "./pages/article/articleByidPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/la-sep" element={<ArticlePage />} />
            <Route
              path="/categories/:categoryId"
              element={<CategoriesPage />}
            />
            <Route path="/articles/:articleId" element={<ArticleByidPage />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
