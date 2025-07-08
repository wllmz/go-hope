import React, { useState, useEffect } from "react";
import { usePatient } from "../../../hooks/patient/usePatient";
import { motion, AnimatePresence } from "framer-motion";

const PatientAidantList = () => {
  const { requests, loading, error, fetchUserRequests, updateStatus } =
    usePatient();
  const [activeTab, setActiveTab] = useState("En attente");

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await updateStatus(requestId, newStatus);
      fetchUserRequests();
    } catch (err) {
      
    }
  };

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );
  const approvedRequests = requests.filter(
    (request) => request.status === "approved"
  );
  const rejectedRequests = requests.filter(
    (request) => request.status === "rejected"
  );

  const renderRequests = (requests) => {
    if (requests.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500 text-lg">Aucune demande à afficher</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <motion.div
            key={request._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#0E3043] leading-tight">
                  {request.title}
                </h3>
                <div className="h-0.5 bg-gradient-to-r from-[#F5943A] to-transparent w-1/3"></div>
              </div>

              <div className="text-gray-600 leading-relaxed">
                <p className="line-clamp-3">{request.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                  <span className="font-medium text-gray-700">
                    Certification
                  </span>
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      request.hasCertification
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {request.hasCertification ? "Oui" : "Non"}
                  </span>
                </div>
                {request.hasCertification && request.certificateUrl && (
                  <a
                    href={request.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-[#F5943A] text-white px-4 py-2.5 rounded-xl hover:bg-[#F1731F] transition-colors duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>Voir le certificat</span>
                  </a>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                      request.status === "pending"
                        ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        : request.status === "approved"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {request.status === "pending"
                      ? "En attente"
                      : request.status === "approved"
                      ? "Approuvé"
                      : "Rejeté"}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {request.status !== "rejected" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(request._id, "rejected")
                        }
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors duration-200"
                      >
                        <span>Rejeté</span>
                      </button>
                    )}
                    {request.status !== "approved" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(request._id, "approved")
                        }
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-white bg-green-500 hover:bg-green-600 rounded-full transition-colors duration-200"
                      >
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Approuver</span>
                      </button>
                    )}
                    {request.status !== "pending" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(request._id, "pending")
                        }
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-white bg-[#F5943A] hover:bg-[#F1731F] rounded-full transition-colors duration-200"
                      >
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>En attente</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5943A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <svg
          className="w-16 h-16 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-[#0E3043]">
              Gestion des demandes patient-aidant
            </h2>
          </div>

          <div className="p-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
              <button
                className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition-all duration-300 ${
                  activeTab === "En attente"
                    ? "bg-white text-[#F5943A] shadow-sm"
                    : "text-gray-600 hover:text-[#F5943A]"
                }`}
                onClick={() => setActiveTab("En attente")}
              >
                En attente
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition-all duration-300 ${
                  activeTab === "Approuvés"
                    ? "bg-white text-[#F5943A] shadow-sm"
                    : "text-gray-600 hover:text-[#F5943A]"
                }`}
                onClick={() => setActiveTab("Approuvés")}
              >
                Approuvés
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition-all duration-300 ${
                  activeTab === "Refusés"
                    ? "bg-white text-[#F5943A] shadow-sm"
                    : "text-gray-600 hover:text-[#F5943A]"
                }`}
                onClick={() => setActiveTab("Refusés")}
              >
                Refusés
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "En attente" && (
                <motion.div
                  key="En attente"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderRequests(pendingRequests)}
                </motion.div>
              )}
              {activeTab === "Approuvés" && (
                <motion.div
                  key="Approuvés"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderRequests(approvedRequests)}
                </motion.div>
              )}
              {activeTab === "Refusés" && (
                <motion.div
                  key="Refusés"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderRequests(rejectedRequests)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAidantList;
