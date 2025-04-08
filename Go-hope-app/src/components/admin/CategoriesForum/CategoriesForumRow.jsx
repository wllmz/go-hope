import React, { useState } from "react";

const CategoriesForumRow = ({ category, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  // Extraction de l'URL de l'image si c'est un objet
  const imageUrl =
    category.image && typeof category.image === "object"
      ? category.image.url || ""
      : category.image;

  // Extraction du nom de la catégorie si c'est un objet
  const categoryName =
    category.categorie && typeof category.categorie === "object"
      ? category.categorie.name || "Sans titre"
      : category.categorie || "Sans titre";

  // Formatage de la date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Date invalide";
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-medium text-gray-800">{categoryName}</div>
        <div className="text-sm text-gray-500">
          Créé le: {formatDate(category?.created_at)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {!imageError && imageUrl ? (
              <img
                src={imageUrl}
                alt={categoryName || "Image catégorie"}
                className="h-10 w-10 object-cover rounded"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
          <span className="ml-2 text-gray-600 text-sm truncate max-w-xs">
            {imageUrl || "Aucune image"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-center space-x-2">
        <button
          onClick={() => onEdit && onEdit()}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Modifier
        </button>
        <button
          onClick={() => onDelete && onDelete()}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default CategoriesForumRow;
