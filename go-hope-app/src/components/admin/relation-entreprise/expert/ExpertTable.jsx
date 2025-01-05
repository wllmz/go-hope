import React from "react";

const ExpertTable = ({ experts, onSendInvite, onDeleteExpert }) => (
  <table className="min-w-full bg-white border border-gray-200 shadow-md">
    <thead className="bg-gray-100">
      <tr>
        <th className="py-2 px-4 border-b text-left">Email</th>
        <th className="py-2 px-4 border-b text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {experts.map((expert) => (
        <tr key={expert.email} className="border-b">
          <td className="py-2 px-4">{expert.email}</td>
          <td className="py-2 px-4 flex justify-center space-x-4">
            <button
              onClick={() => onSendInvite(expert.email)}
              className="text-green-500 hover:text-green-700"
              title="Envoyer une invitation"
            >
              <i className="material-icons">mail</i>
            </button>
            <button
              onClick={() => onDeleteExpert(expert.email)}
              className="text-red-500 hover:text-red-700"
              title="Supprimer"
            >
              <i className="material-icons">delete</i>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ExpertTable;
