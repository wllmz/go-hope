// src/components/auth/RegisterEmployee/ProgressBar.js
import React from "react";

const ProgressBar = ({ step }) => {
  return (
    <div className="w-full h-2 bg-gray-300 mb-4 md:hidden">
      <div
        className="h-full bg-blue-500 rounded"
        style={{ backgroundColor: "#86bfce", width: `${step * 16}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
