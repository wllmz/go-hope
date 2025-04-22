import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import des composants administratifs
import HomeAdminWelcome from "./HomeAdminWelcome";
import AdminUserManagement from "./Subject/SubjectMangement";
import ArticleManagement from "./articles/ArticleManagement";
import CategoryManagement from "./Category/CategoryManagement";
import CategoriesForumManagement from "./CategoriesForum/CategoriesForumManagement";
import FicheAdmin from "./fiche/FicheAdmin";
import PatientAidantList from "./patient-aidant/PatientAidantList";
import WaitingAdmin from "./WaitingList/waitingAdmin";

// Structure des menus administratifs
const adminMenus = [
  {
    id: "welcome",
    label: "Tableau de bord",
    component: HomeAdminWelcome,
    icon: "dashboard",
  },
  {
    id: "subjects",
    label: "Forum",
    component: AdminUserManagement,
    icon: "subject",
  },
  {
    id: "forum-categories",
    label: "Catégories Forum",
    component: CategoriesForumManagement,
    icon: "forum",
  },
  {
    id: "articles",
    label: "Articles",
    component: ArticleManagement,
    icon: "article",
  },
  {
    id: "article-categories",
    label: "Catégories Articles",
    component: CategoryManagement,
    icon: "category",
  },
  {
    id: "fiches",
    label: "Fiches & Articles Partenaires",
    component: FicheAdmin,
    icon: "folder",
  },
  {
    id: "patient-aidant",
    label: "Demandes Patient-Aidant",
    component: PatientAidantList,
    icon: "user",
  },
  {
    id: "waiting-list",
    label: "Liste d'attente",
    component: WaitingAdmin,
    icon: "waiting",
  },
];

const HomeAdmin = () => {
  const [activeTab, setActiveTab] = useState("welcome");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  // Fonction pour obtenir l'icône en fonction du type
  const getIcon = (type) => {
    switch (type) {
      case "dashboard":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        );
      case "subject":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "article":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "folder":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
              clipRule="evenodd"
            />
            <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
          </svg>
        );
      case "category":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        );
      case "forum":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "user":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "waiting":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const ActiveComponent =
    adminMenus.find((menu) => menu.id === activeTab)?.component ||
    HomeAdminWelcome;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <nav className="bg-gradient-to-b from-[#1D5F84] to-[#164964] text-white w-64 min-h-screen shadow-xl">
        <div className="p-5 border-b border-blue-700">
          <h1 className="text-2xl font-bold">GoHope Admin</h1>
          <p className="text-sm text-blue-200">Panneau d'administration</p>
        </div>

        <div className="pt-4">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-blue-200 hover:text-white pl-5 pb-4 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            <span>Retour au site</span>
          </button>
        </div>

        <ul className="mt-2">
          {adminMenus.map((menu) => (
            <li key={menu.id}>
              <button
                onClick={() => setActiveTab(menu.id)}
                className={`w-full text-left flex items-center gap-3 py-3 px-5 transition-all duration-200 ${
                  activeTab === menu.id
                    ? "bg-white text-[#1D5F84] font-medium border-r-4 border-[#F1731F]"
                    : "text-gray-100 hover:bg-blue-700"
                }`}
              >
                {getIcon(menu.icon)}
                <span>{menu.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-4rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
