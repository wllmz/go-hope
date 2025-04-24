import React from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./searchBar";
import CreateSubjectButton from "./CreateSubjectButton";

const Header = () => {
  const location = useLocation();
  const isCategoriesPage = location.pathname.includes("categories");
  const isForumPage =
    location.pathname.includes("forum") || location.pathname === "/forum";

  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-6 pl-2 sm:pl-0">Forum</h1>
        <div className="p-4">
          <SearchBar />
        </div>
        {isForumPage && !isCategoriesPage && (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-orange-500 mb-2">Créer un post</h2>
              <p className="text-gray-700 text-[13px] sm:text-base">
                Posez toutes vos questions sur notre forum ! La communauté va
                vous répondre !
              </p>
            </div>
            <div className="bg-white rounded-lg py-4 px-2 m-2 shadow-md">
              <CreateSubjectButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
