import React from "react";

const SubjectRow = ({ subject, onValidate }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-gray-800">{subject.title}</td>
      <td className="px-6 py-4 text-gray-600">
        {subject.author?.username || "Non défini"}
      </td>
      <td className="px-6 py-4">
        <span
          className={
            subject.validated === "valider"
              ? "inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold"
              : subject.validated === "en attente"
              ? "inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold"
              : "inline-block px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold"
          }
        >
          {subject.validated}
        </span>
      </td>
      <td className="px-6 py-4 text-center space-x-2">
        <button
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          onClick={() => onValidate(subject._id, "valider")}
        >
          Valider
        </button>
        <button
          className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          onClick={() => onValidate(subject._id, "en attente")}
        >
          En attente
        </button>
        <button
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          onClick={() => onValidate(subject._id, "Invalide")}
        >
          Invalide
        </button>
      </td>
    </tr>
  );
};

export default SubjectRow;
