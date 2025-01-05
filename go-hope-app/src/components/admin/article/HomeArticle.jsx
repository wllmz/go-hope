import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArticleManagement from "./articles/ArticleManagement";
import CategoryManagement from "./category/CategoryManagement";
import SousCategoryManagement from "./sous-category/SousCategoryManagement";

const HomeArticle = () => {
  const [activeTab, setActiveTab] = useState("Articles");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-9/12 w-full bg-gray-100 rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Gestion des Articles
        </h1>

        {/* Menu de Navigation */}
        <div className="flex justify-center border-b mb-6">
          <button
            className={`mr-8 pb-2 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Articles"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Articles")}
          >
            Articles
          </button>
          <button
            className={`mr-8 pb-2 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Catégories"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Catégories")}
          >
            Catégories
          </button>
          <button
            className={`pb-2 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Sous-Catégories"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Sous-Catégories")}
          >
            Sous-Catégories
          </button>
        </div>

        {/* Contenu des Sections avec Animations */}
        <AnimatePresence exitBeforeEnter>
          {activeTab === "Articles" && (
            <motion.div
              key="Articles"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <ArticleManagement />
            </motion.div>
          )}

          {activeTab === "Catégories" && (
            <motion.div
              key="Catégories"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <CategoryManagement />
            </motion.div>
          )}

          {activeTab === "Sous-Catégories" && (
            <motion.div
              key="Sous-Catégories"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <SousCategoryManagement />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeArticle;
