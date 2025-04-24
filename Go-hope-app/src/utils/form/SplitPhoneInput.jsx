import React, { useState, useEffect } from "react";

// Liste des indicatifs pour plusieurs pays francophones
const countryCodes = [
  { code: "+33", label: "France (+33)" },
  { code: "+32", label: "Belgique (+32)" },
  { code: "+41", label: "Suisse (+41)" },
  { code: "+1", label: "Canada (+1)" },
  { code: "+352", label: "Luxembourg (+352)" },
];

const SplitPhoneInput = ({
  value,
  onChange,
  placeholder = "Numéro",
  className = "",
  iconComponent = null,
}) => {
  // On suppose que la valeur est sous la forme : indicatif + numéro local
  // Exemple : "+33XXXXXXXXX".
  // On extrait initialement l'indicatif par défaut (le premier du tableau) et le reste.
  const defaultCountry = countryCodes[0].code; // France (+33)
  const [country, setCountry] = useState(defaultCountry);
  const [localNumber, setLocalNumber] = useState("");

  // Mettre à jour l'état si la prop "value" change
  useEffect(() => {
    if (value) {
      // Recherche un indicatif dans la liste
      const found = countryCodes.find((c) => value.startsWith(c.code));
      if (found) {
        setCountry(found.code);
        setLocalNumber(value.slice(found.code.length));
      } else {
        // Sinon, on part du principe qu'il n'y a pas d'indicatif connu
        setCountry(defaultCountry);
        setLocalNumber(value);
      }
    }
  }, [value, defaultCountry]);

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    // Met à jour la valeur globale
    if (onChange) {
      onChange(`${newCountry}${localNumber}`);
    }
  };

  const handleLocalNumberChange = (e) => {
    const newLocalNumber = e.target.value;
    setLocalNumber(newLocalNumber);
    if (onChange) {
      onChange(`${country}${newLocalNumber}`);
    }
  };

  return (
    <div className={`flex space-x-2 ${className} relative`}>
      {iconComponent}
      <select
        value={country}
        onChange={handleCountryChange}
        className="border border-gray-300 bg-white rounded-md p-2
         focus:outline-none focus:border-[#F5943A]"
      >
        {countryCodes.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={localNumber}
        onChange={handleLocalNumberChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 bg-white rounded-md p-2
         focus:outline-none focus:border-[#F5943A]"
      />
    </div>
  );
};

export default SplitPhoneInput;
