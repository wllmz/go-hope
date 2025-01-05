import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpertMetierManagement from "./metier/ExpertMetierManagement";
import SpecialiteManagement from "./specialite/SpecialiteManagement";
import ExpertManagement from "./expert/ExpertManagement";

const RelationEntreprise = () => {
  const [activeTab, setActiveTab] = useState("Experts Métier");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-9/12 w-full bg-gray-100 rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Gestion des Experts
        </h1>

        {/* Menu de Navigation */}
        <div className="flex justify-center border-b mb-6">
          <button
            className={`mr-8 pb-2 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Experts Métier"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Experts Métier")}
          >
            Les experts
          </button>
          <button
            className={`mr-8 pb-2 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Spécialités"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Spécialités")}
          >
            Les spécialités
          </button>
          <button
            className={`pb-2 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Gestion des Experts"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Gestion des Experts")}
          >
            Ajouter Experts
          </button>
        </div>

        {/* Contenu des Sections avec Animations */}
        <AnimatePresence exitBeforeEnter>
          {activeTab === "Experts Métier" && (
            <motion.div
              key="Experts Métier"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <ExpertMetierManagement />
            </motion.div>
          )}

          {activeTab === "Spécialités" && (
            <motion.div
              key="Spécialités"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <SpecialiteManagement />
            </motion.div>
          )}

          {activeTab === "Gestion des Experts" && (
            <motion.div
              key="Gestion des Experts"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <ExpertManagement />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RelationEntreprise;
