import React, { useEffect, useState } from "react";
import { useWaitingList } from "../../../hooks/chat/waiting";

const WaitingAdmin = () => {
  const {
    isLoading,
    error,
    pendingUsers,
    activatedUsers,
    fetchPendingUsers,
    fetchActivatedUsers,
    handleUpdateStatus,
  } = useWaitingList();

  const [activeTab, setActiveTab] = useState("pending");
  const [refreshData, setRefreshData] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      const now = Date.now();
      if (now - lastFetchTime < 2000) {
        
        return;
      }

      setLastFetchTime(now);

      if (activeTab === "pending" && isMounted) {
        await fetchPendingUsers();
      } else if (activeTab === "activated" && isMounted) {
        await fetchActivatedUsers();
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [
    activeTab,
    refreshData,
    lastFetchTime,
    fetchPendingUsers,
    fetchActivatedUsers,
  ]);

  const handleActivateUser = async (userId) => {
    await handleUpdateStatus(userId, "activated");
    setRefreshData((prev) => prev + 1);
  };

  // Fonction pour accéder aux données de manière sûre
  const getUsers = () => {
    if (activeTab === "pending") {
      // Vérifier si pendingUsers existe et si c'est un objet avec une propriété data
      return pendingUsers && pendingUsers.data ? pendingUsers.data : [];
    } else {
      // Vérifier si activatedUsers existe et si c'est un objet avec une propriété data
      return activatedUsers && activatedUsers.data ? activatedUsers.data : [];
    }
  };

  const users = getUsers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B5F8A]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Liste d'attente du chat
        </h2>
        <p className="text-gray-600">
          Gérez les utilisateurs qui souhaitent accéder au service de chat
        </p>
      </div>

      {error && (
        <div className="p-4 mb-6 bg-red-100 text-red-700 border-l-4 border-red-500 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("pending")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "pending"
                  ? "border-[#3B5F8A] text-[#3B5F8A]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              En attente
            </button>
            <button
              onClick={() => setActiveTab("activated")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "activated"
                  ? "border-[#3B5F8A] text-[#3B5F8A]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Activés
            </button>
          </nav>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Utilisateur
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date d'inscription
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users && users.length > 0 ? (
                users.map((entry) => (
                  <tr key={entry._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {entry.user?.username || "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(entry.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {activeTab === "pending" ? (
                        <button
                          onClick={() => handleActivateUser(entry.user?._id)}
                          className="text-white bg-[#3B5F8A] hover:bg-[#2E4A6A] px-4 py-2 rounded-md transition-colors duration-200"
                        >
                          Activer
                        </button>
                      ) : (
                        <span className="text-green-600 bg-green-50 px-4 py-2 rounded-md">
                          Activé
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    {activeTab === "pending"
                      ? "Aucun utilisateur en attente"
                      : "Aucun utilisateur activé"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaitingAdmin;
