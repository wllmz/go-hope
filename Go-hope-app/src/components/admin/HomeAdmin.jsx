import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import des deux composants que vous possédez
import HomeAdminWelcome from "./HomeAdminWelcome";
import AdminUserManagement from "./Subject/SubjectMangement";
import ArticleManagement from "./articles/ArticleManagement";
import CategoryManagement from "./Category/CategoryManagement";

const HomeAdmin = () => {
  const [activeTab, setActiveTab] = useState("Bienvenue");
  const navigate = useNavigate();
  const handleBackClick = () => {
    // Revient à la page précédente
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Menu Vertical */}
      <nav className="bg-blue-500 text-white w-1/5 min-h-screen p-6 shadow-lg">
        <ul>
          <li>
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
              title="Retour"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ transform: "scaleX(-1)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </li>
          <li
            className={`py-4 px-6 text-lg font-semibold cursor-pointer transition-all duration-300 ${
              activeTab === "Bienvenue"
                ? "bg-blue-700 rounded text-white"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("Bienvenue")}
          >
            Bienvenue
          </li>
          <li
            className={`py-4 px-6 text-lg font-semibold cursor-pointer transition-all duration-300 ${
              activeTab === "Gestion des Sujets"
                ? "bg-blue-700 rounded text-white"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("Gestion des Sujets")}
          >
            Gestion des Sujets
          </li>
          <li
            className={`py-4 px-6 text-lg font-semibold cursor-pointer transition-all duration-300 ${
              activeTab === "Gestion des Articles"
                ? "bg-blue-700 rounded text-white"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("Gestion des Articles")}
          >
            Gestion des Articles
          </li>
          <li
            className={`py-4 px-6 text-lg font-semibold cursor-pointer transition-all duration-300 ${
              activeTab === "Gestion des Catégories"
                ? "bg-blue-700 rounded text-white"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("Gestion des Catégories")}
          >
            Gestion des Catégories
          </li>
        </ul>
      </nav>

      {/* Contenu des Sections avec Animations */}
      <div className="p-6 w-4/5">
        <AnimatePresence mode="wait">
          {activeTab === "Bienvenue" && (
            <motion.div
              key="Bienvenue"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <HomeAdminWelcome />
            </motion.div>
          )}
          {activeTab === "Gestion des Sujets" && (
            <motion.div
              key="Gestion des Sujets"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <AdminUserManagement />
            </motion.div>
          )}
          {activeTab === "Gestion des Articles" && (
            <motion.div
              key="Gestion des Articles"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ArticleManagement />
            </motion.div>
          )}
          {activeTab === "Gestion des Catégories" && (
            <motion.div
              key="Gestion des Catégories"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <CategoryManagement />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeAdmin;
