import React, { useState, useEffect } from "react";
import Modal from "../../../utils/form/modal";
import FormInput from "../../../utils/form/FormInput";
import useCategories from "../../../hooks/article/useCategories";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const ArticleModal = ({ isOpen, onClose, onSubmit, article, mode }) => {
  const initialState = {
    title: "",
    content: "", // Nous utilisons ReactQuill pour ce champ
    image: "",
    time_lecture: 0,
    type: "",
    mediaType: "Fiche",
    category: "", // Valeur de l'ID de catégorie
    status: "En cours",
    videoUrl: "",
    videoDuration: 0,
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Utilisation du hook pour récupérer les catégories
  const { categories, fetchAllCategories } = useCategories();

  // Log pour surveiller les mises à jour de "categories"
  useEffect(() => {
    console.log("Liste des catégories mises à jour :", categories);
  }, [categories]);

  // Appel à fetchAllCategories chaque fois que le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      console.log("Modal ouvert, appel de fetchAllCategories");
      fetchAllCategories()
        .then(() => {
          console.log("fetchAllCategories terminé");
        })
        .catch((err) =>
          console.error("Erreur lors de fetchAllCategories :", err)
        );
    }
  }, [isOpen, fetchAllCategories]);

  // Mise à jour de l'état du formulaire lorsque l'article est modifié
  useEffect(() => {
    if (article && mode === "edit") {
      console.log(
        "Mise à jour du formulaire pour l'édition de l'article :",
        article
      );
      setFormData({
        title: article.title || "",
        content: article.content || "",
        image: article.image || "",
        time_lecture: article.time_lecture || 0,
        type: article.type || "",
        mediaType: article.mediaType || "Fiche",
        category: article.category?.[0] || "",
        status: article.status || "En cours",
        videoUrl: article.videoUrl || "",
        videoDuration: article.videoDuration || 0,
      });
    } else {
      setFormData(initialState);
    }
  }, [article, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changement de ${name}:`, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Gestion spécifique pour ReactQuill (le champ content)
  const handleContentChange = (value) => {
    console.log("Changement de contenu :", value);
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));

    if (errors.content) {
      setErrors((prev) => ({
        ...prev,
        content: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Le titre est requis";
    }
    if (!formData.content || formData.content === "<p><br></p>") {
      newErrors.content = "Le contenu est requis";
    }
    if (!formData.image.trim()) {
      newErrors.image = "L'URL de l'image est requise";
    }
    if (!formData.type) {
      newErrors.type = "Le type d'article est requis";
    }
    if (formData.time_lecture <= 0) {
      newErrors.time_lecture = "Le temps de lecture doit être supérieur à 0";
    }
    if (!formData.category) {
      newErrors.category = "Une catégorie est requise";
    }
    console.log("Erreurs de validation :", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Soumission du formulaire avec les données :", formData);
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const titleText =
    mode === "create" ? "Créer un nouvel article" : "Modifier l'article";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{titleText}</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre *
            </label>
            <FormInput
              type="text"
              placeholder="Titre de l'article"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* URL de l'image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de l'image *
            </label>
            <FormInput
              type="text"
              placeholder="URL de l'image"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
          </div>

          {/* Type d'article */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type d'article *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
            >
              <option value="">Sélectionnez un type</option>
              <option value="Article">Article</option>
              <option value="Conseil">Conseil</option>
              <option value="Outil">Outil</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type}</p>
            )}
          </div>

          {/* Format de média */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Format de média
            </label>
            <select
              name="mediaType"
              value={formData.mediaType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
            >
              <option value="">Sélectionnez un format</option>
              <option value="Fiche">Fiche</option>
              <option value="Vidéo">Vidéo</option>
            </select>
          </div>

          {/* Champs vidéo conditionnels */}
          {formData.mediaType === "Vidéo" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de la vidéo *
                </label>
                <FormInput
                  type="text"
                  placeholder="URL de la vidéo"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                />
                {errors.videoUrl && (
                  <p className="text-red-500 text-xs mt-1">{errors.videoUrl}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée de la vidéo (en sec) *
                </label>
                <FormInput
                  type="number"
                  placeholder="Durée de la vidéo"
                  name="videoDuration"
                  value={formData.videoDuration}
                  onChange={handleChange}
                  min="1"
                />
                {errors.videoDuration && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.videoDuration}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Temps de lecture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temps de lecture (en minutes) *
            </label>
            <FormInput
              type="number"
              placeholder="Temps de lecture"
              name="time_lecture"
              value={formData.time_lecture}
              onChange={handleChange}
              min="1"
            />
            {errors.time_lecture && (
              <p className="text-red-500 text-xs mt-1">{errors.time_lecture}</p>
            )}
          </div>

          {/* Statut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
            >
              <option value="">Sélectionnez un statut</option>
              <option value="En cours">En cours</option>
              <option value="Correction">Correction</option>
              <option value="Publié">Publié</option>
            </select>
          </div>

          {/* Contenu avec ReactQuill (react-quill-new) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenu *
            </label>
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Contenu de l'article..."
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content}</p>
            )}
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category_tittle}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {mode === "create" ? "Créer" : "Enregistrer"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ArticleModal;
