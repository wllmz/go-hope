import React from "react";

const CategoryList = ({
  categories,
  onCategoryClick,
  onNavigateToAllCategories,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">À la une </h1>
      </div>
      {categories && categories.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {categories.map((category) => (
            <li
              key={category._id}
              className="cursor-pointer border border-gray-300 p-4 rounded flex flex-col items-center gap-2 hover:shadow-lg transition-shadow"
              onClick={() => onCategoryClick(category._id)}
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.category_tittle}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <span className="text-xl font-semibold">
                {category.category_tittle}
              </span>
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
