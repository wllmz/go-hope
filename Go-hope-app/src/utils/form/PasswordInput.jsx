// src/components/auth/RegisterEmployee/PasswordInput.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({
  placeholder,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="relative mb-6">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-[#F5943A] bg-[white] rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-[rgba(134,191,206,0.16)]"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </button>
    </div>
  );
};

export default PasswordInput;
