import React from "react";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="relative w-9/12 mx-auto mb-5 mt-5">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f79862]"
      />
      <span className="absolute right-4 top-4 text-gray-400">🔍</span>
    </div>
  );
};

export default SearchBar;
