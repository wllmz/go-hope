import React, { useEffect, useState } from "react";
import useAdminUsers from "../../../hooks/admin/useAdminUsers";
import Modal from "../../../utils/form/modal";

const AdminUserManagement = () => {
  const { users, loading, error, fetchAllUsers, updateUserRoles, removeUser } =
    useAdminUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleRoleChange = (email, newRole) => {
    const user = users.find((user) => user.email === email);
    if (!user || user.roles.includes(newRole)) return;

    setModalContent({
      title: "Confirmation",
      content: `Êtes-vous sûr de vouloir changer le rôle de l'utilisateur ${user.firstName} (${email}) en "${newRole}" ?`,
      onConfirm: async () => {
        try {
          await updateUserRoles(email, [newRole]);
          fetchAllUsers();
        } catch (err) {
          console.error(err);
        } finally {
          setIsModalOpen(false);
        }
      },
    });
    setIsModalOpen(true);
  };

  const confirmDeleteUser = (email) => {
    const user = users.find((user) => user.email === email);
    if (!user) return;

    setModalContent({
      title: "Confirmation",
      content: `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.firstName} (${email}) ?`,
      onConfirm: async () => {
        try {
          await removeUser(email);
          fetchAllUsers();
        } catch (err) {
          console.error(err);
        } finally {
          setIsModalOpen(false);
        }
      },
    });
    setIsModalOpen(true);
  };

  const validRoles = [
    "admin_company",
    "admin",
    "employee",
    "expert",
    "visitor",
  ];

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Utilisateur</th>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Rôle</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email} className="border-b">
              <td className="py-2 px-4 flex items-center">
                <img
                  src={user.avatar || "https://via.placeholder.com/40"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold">{user.firstName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </td>
              <td className="py-2 px-4">{user._id}</td>
              <td className="py-2 px-4">
                <select
                  value={user.roles[0] || ""}
                  onChange={(e) => handleRoleChange(user.email, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {validRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4 flex justify-center space-x-2">
                <button
                  onClick={() => confirmDeleteUser(user.email)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="material-icons">delete</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent && (
          <div>
            <h2 className="text-lg font-bold">{modalContent.title}</h2>
            <p>{modalContent.content}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 mr-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Non
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={modalContent.onConfirm}
              >
                Oui
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminUserManagement;
