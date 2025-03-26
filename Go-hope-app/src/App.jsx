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
import SearchResultsPage from "./pages/article/searchResultPage";
import SearchResultsPageForum from "./pages/forum/searchResultPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/inscription" element={<RegisterPage />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/verification" element={<VerificationPage />} />

            {/* Routes protégées */}
            <Route
              path="/accueil"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/la-sep"
              element={
                <PrivateRoute>
                  <ArticlePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/la-sep/categories/:categoryId"
              element={
                <PrivateRoute>
                  <CategoriesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/la-sep/:articleId"
              element={
                <PrivateRoute>
                  <ArticleByidPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/la-sep/tous-les-articles"
              element={
                <PrivateRoute>
                  <AllArticle />
                </PrivateRoute>
              }
            />
            <Route
              path="/forum"
              element={
                <PrivateRoute>
                  <ForumPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/forum/categories/:categoryId"
              element={
                <PrivateRoute>
                  <CategorieForumPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/forum/sujet/:subjectId"
              element={
                <PrivateRoute>
                  <SubjectByid />
                </PrivateRoute>
              }
            />
            <Route
              path="/forum/tous-les-articles"
              element={
                <PrivateRoute>
                  <AllSubject />
                </PrivateRoute>
              }
            />
            <Route
              path="/compte"
              element={
                <PrivateRoute>
                  <ComptePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mes-favoris"
              element={
                <PrivateRoute>
                  <AllFavoritesSubjectPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mes-articles"
              element={
                <PrivateRoute>
                  <AllSubjectByMePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <SearchResultsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/forum/search"
              element={
                <PrivateRoute>
                  <SearchResultsPageForum />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
