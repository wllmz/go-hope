import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import RegisterPage from "./pages/auth/registerPage";
import WelcomePage from "./pages/welcome/welcomePage";
import VerificationPage from "./pages/welcome/verificationPage";
import Home from "./pages/home/homePage";
import "./App.css";
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
import UpdateComptePage from "./pages/compte/updateComptePage";
import AdminPage from "./pages/admin/adminPage";
import PartenairesPage from "./pages/partenaire/partenairesPage";
import NewsPage from "./pages/new/newsPage";
import SantePage from "./pages/sante/santePage";
import PartenaireDetail from "./pages/partenaire/partenaireDetailPage";
import NewsDetail from "./pages/new/newDetailPage";
import SanteDetail from "./pages/sante/santeDetailPage";
import ArticleAllPartenaire from "./pages/partenaire/articleAllPartenaire";
import SanteAllArticle from "./pages/sante/santeAllArticle";
import ProjetPage from "./pages/projet/projetPage";
import ForgotPass from "./pages/password-rest/ForgotPass";
import ResetPass from "./pages/password-rest/ResetPass";
import ChatPage from "./pages/chat/chatPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PendingPublications from "./pages/forum/PendingPublications";
import FooterPage from "./pages/footer/FooterPage";
// Import des pages légales
import MentionsLegales from "./pages/footer/mentions-legale";
import PolitiqueConfidentialite from "./pages/footer/politique-confidentialite";
import ConditionsGenerales from "./pages/footer/conditions-generales";
import Cookies from "./pages/footer/cookies";
import ScrollToTop from "./utils/ScrollToTop";

// Composant qui décide si le footer doit être affiché
const AppContent = () => {
  const location = useLocation();

  // Liste des chemins où le footer ne doit pas être affiché
  const noFooterPaths = [
    "/",
    "/inscription",
    "/connexion",
    "/verification",
    "/mot-de-passe-oublie",
    "/reinitialiser-mot-de-passe",
  ];

  // Vérifier si le chemin actuel est dans la liste des pages sans footer
  const shouldShowFooter = !noFooterPaths.includes(location.pathname);

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow">
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
            path="/modifier-profile"
            element={
              <PrivateRoute>
                <UpdateComptePage />
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
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />
          {/* Routes pour les partenaires */}
          <Route
            path="/partenaires"
            element={
              <PrivateRoute>
                <PartenairesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/partenaires/:id"
            element={
              <PrivateRoute>
                <PartenaireDetail />
              </PrivateRoute>
            }
          />
          {/* Routes pour les news */}
          <Route
            path="/news"
            element={
              <PrivateRoute>
                <NewsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/news/:id"
            element={
              <PrivateRoute>
                <NewsDetail />
              </PrivateRoute>
            }
          />
          {/* Routes pour la santé */}
          <Route
            path="/sante"
            element={
              <PrivateRoute>
                <SantePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/sante/:id"
            element={
              <PrivateRoute>
                <SanteDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/partenaire/la-sep"
            element={
              <PrivateRoute>
                <ArticleAllPartenaire />
              </PrivateRoute>
            }
          />
          <Route
            path="/sante/la-sep"
            element={
              <PrivateRoute>
                <SanteAllArticle />
              </PrivateRoute>
            }
          />
          <Route
            path="/projet"
            element={
              <PrivateRoute>
                <ProjetPage />
              </PrivateRoute>
            }
          />
          <Route path="/mot-de-passe-oublie" element={<ForgotPass />} />
          <Route path="/reinitialiser-mot-de-passe" element={<ResetPass />} />
          <Route
            path="/mes-publications-en-attente"
            element={
              <PrivateRoute>
                <PendingPublications />
              </PrivateRoute>
            }
          />

          <Route
            path="/demande"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />

          {/* Routes pour les pages légales */}
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route
            path="/politique-confidentialite"
            element={<PolitiqueConfidentialite />}
          />
          <Route
            path="/conditions-generales"
            element={<ConditionsGenerales />}
          />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </div>
      {shouldShowFooter && <FooterPage />}
    </main>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
