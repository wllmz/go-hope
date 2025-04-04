import React from "react";

const ActionButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
    >
      {text}
    </button>
  );
};

export default ActionButton;
