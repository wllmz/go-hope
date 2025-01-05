import React from "react";
import FamilySection from "./Family/FamilySection";
import HeaderProfile from "./Header/HeaderProfile";
import SearchBar from "./Search/SearchBar";
import Atelier from "./Ateliers/AllAtelier";

const HomeAll = () => {
  return (
    <main className="min-h-screen flex justify-center bg-[#f1f4f4]">
      <div className="w-full md:w-9/12 md:p-10">
        <HeaderProfile />
        <SearchBar />
        <div className="p-6">
          <FamilySection className="my-6" />
          <Atelier className="my-6" />
        </div>
      </div>
    </main>
  );
};

export default HomeAll;
