// src/components/auth/RegisterEmployee/Conditions.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";

const Conditions = () => {
  return (
    <div className="mb-6">
      <div
        className="flex items-start mb-2 p-4 rounded"
        style={{ backgroundColor: "rgba(247, 152, 98, 0.11)" }}
      >
        <FontAwesomeIcon icon={faShieldAlt} className="text-green-500 mr-2" />
        <p className="text-[#737373] text-sm">
          Seules les données personnelles strictement nécessaires au
          fonctionnement de Flow et de ses services seront récoltées.
        </p>
      </div>
      <div
        className="flex items-start mb-2 p-4 rounded"
        style={{ backgroundColor: "rgba(247, 152, 98, 0.11)" }}
      >
        <FontAwesomeIcon icon={faShieldAlt} className="text-green-500 mr-2" />
        <p className="text-[#737373] text-sm">
          Les données à caractère de santé sont chiffrées : elles ne sont
          lisibles que par vous et n’appartiennent qu’à vous.
        </p>
      </div>
    </div>
  );
};

export default Conditions;
