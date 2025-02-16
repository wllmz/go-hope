import React from "react";

const CategoryList = ({ categories, onCategoryClick }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Liste des Catégories</h1>
      </div>
      {categories && categories.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {categories.map((categorie) => (
            <li
              key={categorie._id}
              className="cursor-pointer border border-gray-300 p-4 rounded flex flex-col items-center gap-2 hover:shadow-lg transition-shadow"
              onClick={() => onCategoryClick(categorie._id)}
            >
              {categorie.image && (
                <img
                  src={categorie.image}
                  alt={categorie.categorie}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <p className="text-xl font-semibold text-black">
                {categorie.categorie || "Titre non défini"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Aucune catégorie trouvée.</p>
      )}
    </>
  );
};

export default CategoryList;
