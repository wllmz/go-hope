import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

const UpdateChildForm = ({
  child,
  onUpdate,
  onDelete,
  onClose,
  loading,
  error,
  states,
  deleteLoading,
  setters,
}) => {
  const {
    name_child,
    gender,
    relationship,
    dateBirth_child,
    isPregnant,
    pregnancyEndDate,
  } = states;

  const {
    setName_child,
    setGender,
    setRelationship,
    setDateBirth_child,
    setIsPregnant,
    setPregnancyEndDate,
  } = setters;

  // Fonction pour formater les dates en "yyyy-MM-dd"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Remplir les champs avec les données existantes de l'enfant
  useEffect(() => {
    console.log("Child data:", child);
    if (child) {
      setName_child(child.name_child || "");
      setGender(child.gender || "");
      setRelationship(child.relationship || "");
      setDateBirth_child(formatDate(child.dateBirth_child));
      setIsPregnant(child.isPregnant || false);
      setPregnancyEndDate(formatDate(child.pregnancyEndDate));
    }
  }, [child]);

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name_child: !isPregnant ? name_child : "",
      gender,
      relationship,
      dateBirth_child: !isPregnant ? dateBirth_child : "",
      isPregnant,
      pregnancyEndDate: isPregnant ? pregnancyEndDate : "",
    };

    onUpdate(child._id, updatedData);
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0a3d64]">
        Modifier les informations de l'enfant
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prénom */}
        {!isPregnant && (
          <div>
            <label className="block text-[#0a3d64] mb-2">Prénom</label>
            <input
              type="text"
              value={name_child}
              onChange={(e) => setName_child(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Prénom"
            />
          </div>
        )}

        {/* Sexe */}
        {!isPregnant && (
          <div className="mb-4 flex justify-center space-x-4">
            {/* Féminin */}
            <div
              onClick={() => setGender("Féminin")}
              className={`cursor-pointer border-2 p-4 rounded-md text-center ${
                gender === "Féminin"
                  ? "bg-blue-100 border-blue-500 text-blue-500"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              <FontAwesomeIcon
                icon={faVenus}
                className={`w-12 h-12 mx-auto mb-2 ${
                  gender === "Féminin" ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <p className="text-[#0a3d64]">Féminin</p>
            </div>

            {/* Masculin */}
            <div
              onClick={() => setGender("Masculin")}
              className={`cursor-pointer border-2 p-4 rounded-md text-center ${
                gender === "Masculin"
                  ? "bg-blue-100 border-blue-500 text-blue-500"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              <FontAwesomeIcon
                icon={faMars}
                className={`w-12 h-12 mx-auto mb-2 ${
                  gender === "Masculin" ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <p className="text-[#0a3d64]">Masculin</p>
            </div>
          </div>
        )}

        {/* Relation */}
        <div>
          <label className="block text-[#0a3d64] mb-2">Relation</label>
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionnez la relation</option>
            <option value="Papa">Papa</option>
            <option value="Maman">Maman</option>
            <option value="Co-Parent">Co-Parent</option>
          </select>
        </div>

        {/* Date de naissance */}
        {!isPregnant && (
          <div>
            <label className="block text-[#0a3d64] mb-2">
              Date de naissance
            </label>
            <input
              type="date"
              value={dateBirth_child}
              onChange={(e) => setDateBirth_child(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Date du terme */}
        {isPregnant && (
          <div>
            <label className="block text-[#0a3d64] mb-2">Date du terme</label>
            <input
              type="date"
              value={pregnancyEndDate}
              onChange={(e) => setPregnancyEndDate(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Boutons */}
        <button
          type="submit"
          className="w-full bg-[#f79862] text-white py-3 rounded-md hover:bg-[#f5d07f] transition"
          disabled={loading}
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-2 text-gray-500 underline hover:text-gray-700 transition"
        >
          Annuler
        </button>

        {/* Bouton de suppression */}
        <button
          type="button"
          onClick={() => onDelete(child._id)}
          className="w-full mt-2 bg-transparent py-3 rounded-md hover:transparent transition text-red-700"
          disabled={deleteLoading}
        >
          {deleteLoading ? "Suppression en cours..." : "Supprimer"}
        </button>

        {/* Affichage des erreurs */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateChildForm;
