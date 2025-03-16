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
import AllArticle from "./pages/article/allArticlePage";
import ForumPage from "./pages/forum/forumPage";
import AllSubject from "./pages/forum/allSubjectPage";
import SubjectByid from "./pages/forum/subjectByIdPage";
import CategorieForumPage from "./pages/forum/categorieForumPage";
import ComptePage from "./pages/compte/comptePage";
import AllFavoritesSubjectPage from "./pages/compte/allFavoritesSubjectPage";
import AllSubjectByMePage from "./pages/compte/allSubjectByMePage";
import SearchResultsPage from "./pages/forum/searchPage";

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
            <Route path="/all-articles" element={<AllArticle />} />

            <Route path="/forum" element={<ForumPage />} />
            <Route
              path="/forum/categories/:categoryId"
              element={<CategorieForumPage />}
            />
            <Route
              path="/forum/subjects/:subjectId"
              element={<SubjectByid />}
            />
            <Route path="/all-subjects" element={<AllSubject />} />
            <Route path="/compte" element={<ComptePage />} />
            <Route
              path="/forum/mes-favoris"
              element={<AllFavoritesSubjectPage />}
            />
            <Route
              path="/forum/mes-articles"
              element={<AllSubjectByMePage />}
            />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
