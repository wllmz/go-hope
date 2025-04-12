import React, { useState, useEffect } from "react";
import Modal from "../../../utils/form/modalCustom";
import FormInput from "../../../utils/form/FormInput";
import FormSelect from "../../../utils/form/FormSelect";
import useFiche from "../../../hooks/fiche/useFiche";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const FormFicheModal = ({ isOpen, onClose, onSuccess, fiche }) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    image: "",
    categorie: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEditing = !!fiche;

  const { addFiche, modifyFiche } = useFiche();

  // Configuration de l'éditeur ReactQuill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: [] }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "color",
    "link",
    "image",
  ];

  // Gestion spécifique du chargement de l'éditeur ReactQuill
  const [editorLoaded, setEditorLoaded] = useState(false);

  // Mise à jour des données du formulaire lorsqu'une fiche est sélectionnée pour modification
  useEffect(() => {
    if (fiche) {
      console.log("Fiche à modifier reçue:", fiche);
      console.log("Description de la fiche:", fiche.description);

      // Réinitialiser l'état de l'éditeur
      setEditorLoaded(false);

      // Mettre à jour les données du formulaire avec un délai
      setTimeout(() => {
        setFormData({
          titre: fiche.titre || "",
          description: fiche.description || "",
          image: fiche.image || "",
          categorie: fiche.categorie || "",
        });

        // Marquer l'éditeur comme chargé après avoir défini le contenu
        setEditorLoaded(true);

        console.log("FormData après mise à jour:", {
          titre: fiche.titre || "",
          description: fiche.description || "",
          image: fiche.image || "",
          categorie: fiche.categorie || "",
        });
      }, 100);
    } else {
      // Réinitialiser le formulaire si aucune fiche n'est sélectionnée
      setFormData({
        titre: "",
        description: "",
        image: "",
        categorie: "",
      });
      setEditorLoaded(true);
    }
  }, [fiche]);

  // Réinitialiser l'éditeur quand la modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setEditorLoaded(false);
      setTimeout(() => {
        setEditorLoaded(true);
      }, 150);
    }
  }, [isOpen]);

  const categorieOptions = [
    { value: "partenaire", label: "Partenaire" },
    { value: "sante", label: "Santé" },
    { value: "news", label: "News" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    console.log("Contenu de l'éditeur mis à jour:", value);
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleSelectChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      categorie: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.titre.trim()) {
      setError("Le titre est obligatoire");
      return false;
    }
    if (!formData.description.trim()) {
      setError("La description est obligatoire");
      return false;
    }
    if (!formData.image.trim()) {
      setError("L'URL de l'image est obligatoire");
      return false;
    }
    if (!formData.categorie) {
      setError("La catégorie est obligatoire");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      let result;

      console.log("Données du formulaire à soumettre:", formData);

      if (isEditing) {
        // Mise à jour d'une fiche existante
        result = await modifyFiche(fiche._id, formData);
      } else {
        // Création d'une nouvelle fiche
        result = await addFiche(formData);
      }

      console.log("Résultat de l'opération:", result);

      if (onSuccess) {
        onSuccess(result);
      }
      onClose();
    } catch (err) {
      console.error("Erreur lors de la soumission:", err);
      setError(
        err.message ||
          `Une erreur est survenue lors de la ${
            isEditing ? "modification" : "création"
          } de la fiche`
      );
    } finally {
      setLoading(false);
    }
  };

  // Log pour vérifier le contenu en cours d'affichage
  console.log("Rendu du composant avec formData:", formData);
  console.log("Description actuelle:", formData.description);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-2">
        <h2 className="text-2xl font-bold text-[#1D5F84] mb-6">
          {isEditing ? "Modifier la fiche" : "Créer une nouvelle fiche"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="titre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Titre de la fiche
            </label>
            <FormInput
              id="titre"
              name="titre"
              placeholder="Entrez le titre de la fiche"
              value={formData.titre}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <div className="quill-container" style={{ minHeight: "350px" }}>
              {editorLoaded && (
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={handleQuillChange}
                  modules={modules}
                  formats={formats}
                  placeholder="Décrivez la fiche"
                  style={{ height: "300px" }}
                />
              )}
            </div>
            <style jsx>{`
              .quill-container .ql-editor {
                min-height: 250px;
                max-height: 500px;
                overflow-y: auto;
              }
            `}</style>
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              URL de l'image
            </label>
            <FormInput
              id="image"
              name="image"
              placeholder="Entrez l'URL de l'image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="categorie"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Catégorie
            </label>
            <FormSelect
              id="categorie"
              label="Catégorie"
              value={formData.categorie}
              onChange={handleSelectChange}
              placeholder="Sélectionnez une catégorie"
              options={categorieOptions}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-[#F1731F] text-white rounded-lg hover:bg-[#F5943A] transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? isEditing
                  ? "Modification en cours..."
                  : "Création en cours..."
                : isEditing
                ? "Modifier la fiche"
                : "Créer la fiche"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FormFicheModal;
