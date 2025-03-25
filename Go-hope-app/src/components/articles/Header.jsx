import React from "react";
import SearchBar from "./searchBar";
import MediaTabs from "./MediaTabs";
import { useLocation } from "react-router-dom";

const Header = ({ selectedMediaType, setSelectedMediaType }) => {
  const location = useLocation();
  const title = location.pathname.includes("la-sep")
    ? "La Sclérose en Plaques"
    : "Mes enregistrements";

  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
      <div className="mx-auto">
        <h1 className="text-2xl sm:text-3xl text-gray-800 mb-6 pl-2 sm:pl-32">
          {title}
        </h1>
        <div className="mb-1 flex justify-center">
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
