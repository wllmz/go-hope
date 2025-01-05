// src/utils/form/SelectInput.jsx
import React from "react";

const SelectInput = ({ options, value, onChange, label, name }) => {
  return (
    <div className="mb-6">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-[rgba(134,191,206,0.16)] bg-[rgba(134,191,206,0.16)] rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[rgba(134,191,206,0.16)]"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
