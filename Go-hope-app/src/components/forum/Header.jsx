import React from "react";
import SearchBar from "./searchBar";

const Header = () => {
  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
      <div className="mx-auto">
        <h1 className="text-2xl sm:text-3xl text-gray-800 mb-6 pl-2 sm:pl-32">
          Forum
        </h1>
        <div className="p-6 max-w-4xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
