import React from "react";

const CategoryList = ({
  categories,
  onCategoryClick,
  onNavigateToAllCategories,
  articleCounts,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="">À la une</h2>
      </div>
      {categories && categories.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3 mb-8">
          {categories.map((category) => (
            <li
              key={category._id}
              className="cursor-pointer rounded-xl overflow-hidden h-36 sm:h-40 md:h-48 relative group"
              onClick={() => onCategoryClick(category._id)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={
                    category.image ||
                    "https://via.placeholder.com/400x250/333/fff"
                  }
                  alt={category.category_tittle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 md:p-5 text-white">
                <h3 className="text-sm sm:text-lg md:text-xl uppercase font-bold tracking-wide mb-0 sm:mb-1 line-clamp-2">
                  {category.category_tittle || "Titre non défini"}
                </h3>
                <p className="text-xs sm:text-sm font-medium">
                  {articleCounts && articleCounts[category._id]
                    ? articleCounts[category._id]
                    : 0}{" "}
                  article
                  {articleCounts && articleCounts[category._id] !== 1
                    ? "s"
                    : ""}
                </p>
              </div>
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
