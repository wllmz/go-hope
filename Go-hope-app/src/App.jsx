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

function App() {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verification" element={<VerificationPage />} />

            {/* Routes protégées */}
            <Route
              path="/home"
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
              path="/categories/:categoryId"
              element={
                <PrivateRoute>
                  <CategoriesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/articles/:articleId"
              element={
                <PrivateRoute>
                  <ArticleByidPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/all-articles"
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
              path="/forum/subjects/:subjectId"
              element={
                <PrivateRoute>
                  <SubjectByid />
                </PrivateRoute>
              }
            />
            <Route
              path="/all-subjects"
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
              path="/forum/mes-favoris"
              element={
                <PrivateRoute>
                  <AllFavoritesSubjectPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/forum/mes-articles"
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
