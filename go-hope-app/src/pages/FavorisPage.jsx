import React from "react";
import HomeFavRead from "../components/Favoris-Read/HomeFav-Read";
const FavorisPage = () => {
  return (
    <main className="min-h-screen flex justify-center bg-[#f1f4f4]">
      <div className="w-full md:w-9/12 md:p-10">
        <HomeFavRead />
      </div>
    </main>
  );
};

export default FavorisPage;
