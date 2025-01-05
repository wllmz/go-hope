import React, { useState } from "react";
import HomeAdminWelcome from "./HomeAdminWelcome";
import AdminUserManagement from "./user/AdminUserManagement";
import RelationEntreprise from "./relation-entreprise/RelationEntreprise";
import HomeArticle from "./article/HomeArticle";
import { motion, AnimatePresence } from "framer-motion";

const HomeAdmin = () => {
  const [activeTab, setActiveTab] = useState("Bienvenue");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Menu Vertical */}
      <nav className="bg-blue-500 text-white w-1/5 min-h-screen p-6 shadow-lg">
        <ul>
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
              activeTab === "Gestion des Utilisateurs"
                ? "bg-blue-700 rounded text-white"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("Gestion des Utilisateurs")}
          >
            Gestion des Utilisateurs
          </li>
          <li
            className={`py-4 px-6 text-lg font-semibold cursor-pointer transition-all duration-300 ${
              activeTab === "Gestion des Experts"
                ? "bg-blue-700 rounded text-white"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("Gestion des Experts")}
          >
            Gestion des Experts
          </li>
          <li
            className={`py-4 px-6 text-lg font-semibold cursor-pointer transition-all duration-300 ${
              activeTab === "Article"
                ? "bg-blue-700 rounded text-white"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("Article")}
          >
            Article
          </li>
        </ul>
      </nav>

      {/* Contenu des Sections avec Animations */}
      <div className="p-6 w-4/5">
        <AnimatePresence exitBeforeEnter>
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
          {activeTab === "Gestion des Utilisateurs" && (
            <motion.div
              key="Gestion des Utilisateurs"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <AdminUserManagement />
            </motion.div>
          )}
          {activeTab === "Gestion des Experts" && (
            <motion.div
              key="Gestion des Experts"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <RelationEntreprise />
            </motion.div>
          )}

          {activeTab === "Article" && (
            <motion.div
              key="Article"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <HomeArticle />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeAdmin;
