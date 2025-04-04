import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSubjectsValidation from "../../../hooks/forum/useSubjectsValidation";
import SubjectRow from "./SubjectRow";

const SubjectManagement = () => {
  const {
    adminSubjects,
    loading,
    error,
    fetchAdminSubjects,
    validateAdminSubject,
  } = useSubjectsValidation();

  const [activeTab, setActiveTab] = useState("Valides"); // "Valides", "En attente", "Invalide"

  useEffect(() => {
    fetchAdminSubjects();
  }, [fetchAdminSubjects]);

  const handleValidate = async (subjectId, newStatus) => {
    try {
      await validateAdminSubject(subjectId, { validated: newStatus });
      fetchAdminSubjects();
    } catch (err) {
      console.error("Erreur lors de la validation du sujet :", err);
    }
  };

  // Séparation stricte selon la valeur de validated
  const validSubjects = adminSubjects.filter(
    (subject) => subject.validated === "valider"
  );
  const waitingSubjects = adminSubjects.filter(
    (subject) => subject.validated === "en attente"
  );
  const invalidSubjects = adminSubjects.filter(
    (subject) => subject.validated === "Invalide"
  );

  const renderTable = (subjects) => {
    if (subjects.length === 0) {
      return <p className="text-gray-600 text-lg">Aucun sujet à afficher.</p>;
    }
    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
                Auteur
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
                Statut
              </th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <SubjectRow
                key={subject._id}
                subject={subject}
                onValidate={handleValidate}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Gestion des sujets
        </h1>

        {loading && (
          <p className="text-gray-600 text-lg">Chargement des sujets...</p>
        )}
        {error && (
          <p className="text-red-500 text-lg">
            {error.message || "Erreur lors du chargement des sujets."}
          </p>
        )}

        {/* Menu des onglets */}
        <div className="flex border-b mb-6">
          <button
            className={`py-3 px-6 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Valides"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Valides")}
          >
            Sujets Valides
          </button>
          <button
            className={`py-3 px-6 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "En attente"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("En attente")}
          >
            Sujets en Attente
          </button>
          <button
            className={`py-3 px-6 font-semibold text-lg transition-colors duration-300 ${
              activeTab === "Invalide"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Invalide")}
          >
            Sujets Invalide
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Valides" && (
            <motion.div
              key="Valides"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {renderTable(validSubjects)}
            </motion.div>
          )}
          {activeTab === "En attente" && (
            <motion.div
              key="En attente"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {renderTable(waitingSubjects)}
            </motion.div>
          )}
          {activeTab === "Invalide" && (
            <motion.div
              key="Invalide"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderTable(invalidSubjects)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubjectManagement;
