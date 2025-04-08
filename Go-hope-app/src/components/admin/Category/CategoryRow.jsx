import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const CategoryRow = ({ category, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <h4 className="text-gray-800">{category.category_tittle}</h4>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          {category.category_image ? (
            <img
              src={category.category_image}
              alt={category.category_tittle}
              className="w-12 h-12 object-cover rounded"
              onError={(e) => {
                e.currentTarget.src = ""; // Image par défaut si erreur
                e.currentTarget.classList.add("bg-gray-200");
              }}
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
              No img
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-center space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          <FiEdit2 className="mr-1" />
          Modifier
        </button>
        <button
          onClick={() => onDelete(category._id)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors inline-flex items-center"
        >
          <FiTrash2 className="mr-1" />
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;
