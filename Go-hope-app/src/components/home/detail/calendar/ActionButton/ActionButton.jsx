import React from "react";

const ActionButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-white py-2.5 px-4 rounded-xl font-medium transition duration-200 shadow-sm text-center"
    >
      {text}
    </button>
  );
};

export default ActionButton;
