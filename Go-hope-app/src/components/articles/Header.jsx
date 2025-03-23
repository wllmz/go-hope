import React from "react";
import SearchBar from "./searchBar";
import MediaTabs from "./MediaTabs";

const Header = ({ selectedMediaType, setSelectedMediaType }) => {
  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
      <div className="mx-auto">
        <h1 className="text-2xl sm:text-3xl text-gray-800 mb-6 pl-2 sm:pl-32">
          La Sclérose en Plaques
        </h1>
        <div className="mb-12 flex justify-center px-5">
          <SearchBar />
        </div>
        <MediaTabs
          selectedMediaType={selectedMediaType}
          setSelectedMediaType={setSelectedMediaType}
        />
      </div>
    </header>
  );
};

export default Header;
