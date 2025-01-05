import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Homepage from "./pages/HomePage";
import UserInfoPage from "./pages/user/UserInfoPage";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./context/PrivateRoute";
import Login from "./pages/auth/Login";
import ArticleDetail from "./components/Home/Articles/ArticlePage";
import AllAtelelierPage from "./pages/AllAtelelierPage";
import FavorisPage from "./pages/FavorisPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ResetPassword from "./components/admin/relation-entreprise/expert/auth/ResetPassword";
function App() {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Homepage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <UserInfoPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/articles/:id"
              element={
                <PrivateRoute>
                  <ArticleDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/ateliers"
              element={
                <PrivateRoute>
                  <AllAtelelierPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mes-favoris"
              element={
                <PrivateRoute>
                  <FavorisPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <PrivateRoute role="admin">
                  <AdminPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/welcome"
              element={
                <PrivateRoute role="admin">
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
