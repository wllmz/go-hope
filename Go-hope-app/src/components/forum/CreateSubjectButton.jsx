import React, { useState, useRef, useEffect } from "react";
import Modal from "../../utils/form/ModalFade";
import useSubjectsForum from "../../hooks/forum/useSubject";
import useCategoriesForum from "../../hooks/forum/useCategorie";
import useUploads from "../../hooks/uploads/useUploads";

const CreateSubjectButton = ({ onSubjectCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestSentModalOpen, setIsRequestSentModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const { createSubject } = useSubjectsForum();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategoriesForum();

  // Utilisation du hook d'upload
  const {
    isLoading: uploadLoading,
    error: uploadError,
    uploadedImage,
    handleImageUpload,
  } = useUploads();

  useEffect(() => {
  }, [categories, categoriesLoading, categoriesError]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    fetchCategories();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setCategoryId("");
    setDescription("");
    setSelectedImage(null);
    setErrorMessage("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialiser le message d'erreur

    if (!title.trim() || !categoryId || !description.trim()) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // Si une image est sélectionnée, on l'upload d'abord
      if (selectedImage) {
        try {
          const uploadResult = await handleImageUpload(selectedImage);
          if (uploadResult && uploadResult.filePath) {
            imageUrl = uploadResult.filePath;
          }
        } catch (uploadErr) {
          console.error("Erreur lors de l'upload de l'image:", uploadErr);
          setErrorMessage("Erreur lors de l'upload de l'image");
          setIsSubmitting(false);
          return;
        }
      }

      // Création du sujet avec l'URL de l'image si disponible
      const subjectData = {
        title,
        content: description,
        category: categoryId,
        image: imageUrl,
      };


      const response = await createSubject(subjectData);
      const newSubject = response.subject || response;

      handleCloseModal();

      // Afficher la popup de confirmation de demande envoyée
      setIsRequestSentModalOpen(true);
      if (onSubjectCreated) {
        onSubjectCreated(newSubject);
      }
    } catch (err) {
      console.error("Erreur lors de la création du sujet:", err);
      // Affichage spécifique du message d'erreur si présent dans err.message
      if (err && err.message) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "Erreur lors de la création du sujet, veuillez réessayer."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fermeture automatique de la popup de confirmation après 20 secondes
  useEffect(() => {
    let timer;
    if (isRequestSentModalOpen) {
      timer = setTimeout(() => {
        setIsRequestSentModalOpen(false);
      }, 20000);
    }
    return () => clearTimeout(timer);
  }, [isRequestSentModalOpen]);

  return (
    <>
      {/* Bouton déclencheur de la popup de création */}
      <div
        className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-orange-600 transition-colors"
        onClick={handleOpenModal}
      >
        <span className="text-white text-[36px] font-light leading-none flex items-center justify-center pb-1">
          +
        </span>
      </div>

      {/* Popup de création de post */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="mr-[5px]">
          <h2 className="mb-4">Créer un post</h2>

          {/* Affichage du message d'erreur de manière bien visible */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-500 text-red-700 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du post
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder=""
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              {categoriesLoading ? (
                <div className="text-sm text-gray-500">
                  Chargement des catégories...
                </div>
              ) : categoriesError ? (
                <div className="text-sm text-red-500">
                  Erreur: Impossible de charger les catégories
                </div>
              ) : (
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categorie || "Catégorie sans nom"}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Aucune catégorie disponible
                    </option>
                  )}
                </select>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>

              {selectedImage ? (
                <div className="relative mb-2">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  onClick={handleClickUpload}
                  className="w-full p-4 border border-gray-300 rounded-md text-center cursor-pointer bg-orange-100 hover:bg-orange-200 transition-colors"
                >
                  <span className="text-orange-500">
                    Cliquer pour ajouter une image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}

              {uploadLoading && (
                <div className="mt-2 text-sm text-blue-500">
                  Chargement de l'image...
                </div>
              )}

              {uploadError && (
                <div className="mt-2 text-sm text-red-500">
                  Erreur: {uploadError}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description du post
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                placeholder=""
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || uploadLoading}
              className="w-full bg-[#0a3d64] text-white py-3 rounded-md  transition-colors disabled:bg-gray-400"
            >
              {isSubmitting || uploadLoading
                ? "Création en cours..."
                : "Valider"}
            </button>
          </form>
        </div>
      </Modal>

      {/* Popup de confirmation de demande envoyée */}
      <Modal
        isOpen={isRequestSentModalOpen}
        onClose={() => setIsRequestSentModalOpen(false)}
      >
        <div className="p-4">
          <h2 className="mb-4 text-green-600">Demande envoyée</h2>
          <p className="text-gray-700">
            Votre demande a bien été envoyée. Elle sera traitée et validée par
            nos admins dans les plus brefs délais.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CreateSubjectButton;
