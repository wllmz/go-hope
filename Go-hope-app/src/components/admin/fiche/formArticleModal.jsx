import React, { useState, useEffect } from "react";
import Modal from "../../../utils/form/modalCustom";
import FormInput from "../../../utils/form/FormInput";
import FormSelect from "../../../utils/form/FormSelect";
import useFiche from "../../../hooks/fiche/useFiche";
import useArticle from "../../../hooks/fiche/useArticle";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const FormArticleModal = ({ isOpen, onClose, onSuccess, article }) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    image: "",
    ficheTitre: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ficheOptions, setFicheOptions] = useState([]);
  const isEditing = !!article;

  const { fiches, fetchAllFiches, loading: fichesLoading } = useFiche();
  const { addArticle, updateArticleData } = useArticle();

  // Configuration de l'éditeur ReactQuill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: ["", "center", "right", "justify"] }],
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

  // Chargement des fiches lorsque le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      fetchAllFiches();
    }
  }, [isOpen, fetchAllFiches]);

  // Mise à jour des données du formulaire lorsqu'un article est sélectionné pour modification
  useEffect(() => {
    if (article) {
      console.log("Article à modifier:", article);
      console.log("Description de l'article:", article.description);

      // Réinitialiser l'état de l'éditeur
      setEditorLoaded(false);

      // Mettre à jour les données du formulaire avec un délai
      setTimeout(() => {
        setFormData({
          titre: article.titre || "",
          description: article.description || "",
          image: article.image || "",
          ficheTitre: article.ficheTitre || article.fiche?.titre || "",
        });
        // Marquer l'éditeur comme chargé après avoir défini le contenu
        setEditorLoaded(true);
      }, 100);
    } else {
      // Réinitialiser le formulaire si aucun article n'est sélectionné
      setFormData({
        titre: "",
        description: "",
        image: "",
        ficheTitre: "",
      });
      setEditorLoaded(true);
    }
  }, [article]);

  // Réinitialiser l'éditeur quand la modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setEditorLoaded(false);
      setTimeout(() => {
        setEditorLoaded(true);
      }, 150);
    }
  }, [isOpen]);

  // Préparation des options avec les titres des fiches
  useEffect(() => {
    if (fiches && fiches.length > 0) {
      const options = fiches.map((fiche) => ({
        value: fiche.titre,
        label: fiche.titre,
      }));
      setFicheOptions(options);

      // Si on est en mode édition et que l'article a une fiche associée qui n'est pas dans les options,
      // vérifier si on peut la trouver par son ID
      if (isEditing && article && !formData.ficheTitre && article.fiche?._id) {
        const associatedFiche = fiches.find((f) => f._id === article.fiche._id);
        if (associatedFiche) {
          setFormData((prev) => ({
            ...prev,
            ficheTitre: associatedFiche.titre,
          }));
        }
      }
    }
  }, [fiches, isEditing, article, formData.ficheTitre]);

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
    console.log("Nouvelle fiche sélectionnée:", e.target.value);
    setFormData((prev) => ({
      ...prev,
      ficheTitre: e.target.value,
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
    if (!formData.ficheTitre) {
      setError("Le titre de la fiche est obligatoire");
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

      // Affichage des données avant envoi
      console.log("Données à envoyer:", formData);

      if (isEditing) {
        // Mise à jour d'un article existant
        result = await updateArticleData(article._id, formData);
      } else {
        // Création d'un nouvel article
        result = await addArticle(formData);
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
          } de l'article`
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
        <h2 className="text-2xl font-bold text-[#F1731F] mb-6">
          {isEditing ? "Modifier l'article" : "Créer un nouvel article"}
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
              Titre de l'article
            </label>
            <FormInput
              id="titre"
              name="titre"
              placeholder="Entrez le titre de l'article"
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
                  placeholder="Décrivez l'article"
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

              /* Style pour les images */
              .quill-container .ql-editor img {
                max-width: 100%;
                height: auto;
              }

              /* Style pour les images dans du texte centré */
              .quill-container .ql-editor .ql-align-center img {
                display: block;
                margin-left: auto;
                margin-right: auto;
              }

              /* Styles globaux pour l'affichage frontend */
              :global(.ql-align-center) {
                text-align: center;
              }

              :global(.ql-align-center img) {
                display: block;
                margin-left: auto;
                margin-right: auto;
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
              htmlFor="ficheTitre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Fiche associée
            </label>
            <FormSelect
              id="ficheTitre"
              label="Titre de la fiche"
              value={formData.ficheTitre}
              onChange={handleSelectChange}
              placeholder={
                fichesLoading
                  ? "Chargement des fiches..."
                  : "Sélectionnez une fiche"
              }
              options={ficheOptions}
              disabled={isEditing}
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
                ? "Modifier l'article"
                : "Créer l'article"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FormArticleModal;
