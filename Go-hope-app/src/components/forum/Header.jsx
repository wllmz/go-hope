import React from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./searchBar";
import CreateSubjectButton from "./createSubjectButton";

const Header = () => {
  const location = useLocation();
  const isCategoriesPage = location.pathname.includes("categories");

  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-6 pl-2 sm:pl-32">Forum</h1>
        <div className="p-6">
          <SearchBar />
        </div>
        {!isCategoriesPage && (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-orange-500 mb-2">Une question ?</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Posez toutes vos questions sur notre forum !<br />
                La communauté va vous répondre !
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <CreateSubjectButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
