import React, { useState, useEffect } from "react";
import Modal from "../../../utils/form/modal";
import FormInput from "../../../utils/form/FormInput";
import useCategories from "../../../hooks/article/useCategories";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import useUploads from "../../../hooks/uploads/useUploads";
import { FiUpload } from "react-icons/fi";

const ArticleModal = ({ isOpen, onClose, onSubmit, article, mode }) => {
  const initialState = {
    title: "",
    content: "",
    image: "",
    time_lecture: 0,
    type: "",
    mediaType: "Fiche",
    category: "",
    status: "En cours",
    videoUrl: "",
    videoDuration: 0,
    genre: "classique",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadType, setUploadType] = useState("image"); // 'image' ou 'video'

  // Récupération des catégories
  const { categories, fetchAllCategories } = useCategories();

  // Hook pour gérer l'upload d'images
  const {
    isLoading: uploadLoading,
    error: uploadError,
    uploadedImage,
    handleImageUpload,
  } = useUploads();

  // Appel de fetchAllCategories à chaque ouverture de la modal
  useEffect(() => {
    if (isOpen) {
      console.log("Modal ouverte, appel de fetchAllCategories");
      fetchAllCategories().catch((err) =>
        console.error("Erreur lors de fetchAllCategories :", err)
      );
    }
  }, [isOpen, fetchAllCategories]);

  // Mise à jour du formulaire à chaque ouverture de la modal ou changement d'article
  useEffect(() => {
    if (isOpen) {
      if (article && mode === "edit") {
        console.log("Article reçu dans la modal :", article);
        console.log("Catégories de l'article :", article.category);

        setFormData({
          title: article.title || "",
          content: article.content || "",
          image: article.image || "",
          time_lecture: article.time_lecture || 0,
          type: article.type || "",
          mediaType: article.mediaType || "Fiche",
          category: Array.isArray(article.category)
            ? article.category[0]?._id
            : article.category || "",
          status: article.status || "En cours",
          videoUrl: article.videoUrl || "",
          videoDuration: article.videoDuration || 0,
          genre: article.genre || "classique",
        });

        // Définir les aperçus des médias existants
        if (article.image) {
          setImagePreview(article.image);
        }
      } else {
        setFormData(initialState);
        setImagePreview(null);
      }
    }
  }, [article, mode, isOpen]);

  // Mettre à jour le formulaire quand une image est uploadée
  useEffect(() => {
    if (uploadedImage && uploadedImage.filePath) {
      if (uploadType === "image") {
        setFormData((prev) => ({
          ...prev,
          image: uploadedImage.filePath,
        }));
        setImagePreview(uploadedImage.filePath);
      } else if (uploadType === "video") {
        setFormData((prev) => ({
          ...prev,
          videoUrl: uploadedImage.filePath,
        }));
      }
    }
  }, [uploadedImage, uploadType]);

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

  // Gestion de l'upload d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadType("image");

      // Créer un aperçu local
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload l'image
      handleImageUpload(file);
    }
  };

  // Gestion de l'upload de vidéo
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadType("video");
      handleImageUpload(file);
    }
  };

  // Gestion spécifique pour ReactQuill (champ content)
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
      newErrors.image = "L'image est requise";
    }
    if (!formData.type) {
      newErrors.type = "Le type d'article est requis";
    }
    if (formData.mediaType === "Fiche" && formData.time_lecture <= 0) {
      newErrors.time_lecture = "Le temps de lecture doit être supérieur à 0";
    }
    if (formData.mediaType === "Vidéo") {
      if (formData.videoDuration <= 0) {
        newErrors.videoDuration =
          "La durée de la vidéo doit être supérieure à 0";
      }
      if (!formData.videoUrl) {
        newErrors.videoUrl = "L'URL de la vidéo est requise";
      }
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

    // Vérifier si un upload est en cours
    if (uploadLoading) {
      alert("Veuillez attendre que le téléchargement soit terminé");
      return;
    }

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

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image *
            </label>
            <div className="space-y-2">
              {imagePreview && (
                <div className="relative w-full h-40">
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
              <label className="flex items-center justify-center w-full h-20 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <FiUpload className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-600">
                    {imagePreview ? "Changer l'image" : "Télécharger une image"}
                  </span>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {uploadType === "image" && uploadLoading && (
                <p className="text-blue-500 text-xs">
                  Téléchargement en cours...
                </p>
              )}
              {uploadType === "image" && uploadError && (
                <p className="text-red-500 text-xs">Erreur: {uploadError}</p>
              )}
            </div>
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
              <option value="Fiche">Fiche</option>
              <option value="Vidéo">Vidéo</option>
            </select>
          </div>

          {/* Champs vidéo conditionnels */}
          {formData.mediaType === "Vidéo" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vidéo *
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FormInput
                      type="text"
                      placeholder="URL de la vidéo"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      className="flex-1"
                    />
                    <label className="flex items-center justify-center h-10 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600">
                      <FiUpload className="mr-2" />
                      <span>Télécharger</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {uploadType === "video" && uploadLoading && (
                    <p className="text-blue-500 text-xs">
                      Téléchargement en cours...
                    </p>
                  )}
                  {uploadType === "video" && uploadError && (
                    <p className="text-red-500 text-xs">
                      Erreur: {uploadError}
                    </p>
                  )}
                </div>
                {errors.videoUrl && (
                  <p className="text-red-500 text-xs mt-1">{errors.videoUrl}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée de la vidéo (en minutes) *
                </label>
                <FormInput
                  type="number"
                  placeholder="Durée de la vidéo en minutes"
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

          {/* Temps de lecture (seulement pour les fiches) */}
          {formData.mediaType === "Fiche" && (
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.time_lecture}
                </p>
              )}
            </div>
          )}

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

          {/* Contenu avec ReactQuill */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenu *
            </label>
            <ReactQuill
              key={article ? article._id : "new"} // Forcer le remontage lors du changement d'article
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

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
            >
              <option value="classique">Classique</option>
              <option value="partenaire">Partenaire</option>
              <option value="sante">Santé</option>
            </select>
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
            disabled={uploadLoading}
            className={`px-4 py-2 ${
              uploadLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-md transition-colors`}
          >
            {mode === "create" ? "Créer" : "Enregistrer"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ArticleModal;
