import React, { useState } from "react";
import Family from "../Home/Family/Family";
import HeaderProfile from "../Home/Header/HeaderProfile";
import ProfileInfo from "./user/ProfileInfo";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Mon profil");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-9/12 w-full bg-gray-100 rounded-lg p-8">
        <HeaderProfile />

        <button
          className="mb-4 flex items-center gap-2 text-[#0a3d64]"
          onClick={() => navigate("/home")}
        >
          <span className="material-icons-outlined">arrow_back</span>
          Retour
        </button>

        <div className="max-w-6/12 w-full bg-white shadow-lg rounded-lg p-8 mx-auto mt-6">
          {/* Menu de Navigation */}
          <div className="flex border-b mb-6">
            <button
              className={`mr-8 pb-2 font-semibold text-lg transition-colors duration-300 ${
                activeTab === "Mon profil"
                  ? "border-b-2 border-[#0a3d64] text-[#0a3d64]"
                  : "text-gray-500 hover:text-[#0a3d64]"
              }`}
              onClick={() => setActiveTab("Mon profil")}
            >
              Profile
            </button>
            <button
              className={`mr-8 pb-2 font-semibold text-lg transition-colors duration-300 ${
                activeTab === "Ma famille"
                  ? "border-b-2 border-[#0a3d64] text-[#0a3d64]"
                  : "text-gray-500 hover:text-[#0a3d64]"
              }`}
              onClick={() => setActiveTab("Ma famille")}
            >
              Family
            </button>
          </div>

          {/* Contenu des Sections avec Animations (Optionnel) */}
          <AnimatePresence exitBeforeEnter>
            {activeTab === "Mon profil" && (
              <motion.div
                key="Mon profil"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileInfo />
              </motion.div>
            )}

            {activeTab === "Ma famille" && (
              <motion.div
                key="Ma famille"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Family />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
