import React, { useState, useRef, useEffect } from "react";
import Modal from "../../utils/form/ModalFade";
import useSubjectsForum from "../../hooks/forum/useSubject";
import useCategoriesForum from "../../hooks/forum/useCategorie";

const CreateSubjectButton = ({ onSubjectCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestSentModalOpen, setIsRequestSentModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    console.log("Categories chargées:", categories);
    console.log("Categories loading:", categoriesLoading);
    console.log("Categories error:", categoriesError);
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
    setImages([]);
    setErrorMessage("");
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
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
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", description);
      // Envoi de la catégorie directement, sans JSON.stringify.
      formData.append("category", categoryId);

      // Envoi uniquement de la première image sélectionnée
      if (images.length > 0) {
        formData.append("image", images[0]);
      }

      console.log("Données envoyées au serveur:");
      console.log("- title:", title);
      console.log("- category:", categoryId);
      console.log("- content:", description);
      console.log(
        "- image:",
        images.length > 0 ? "1 fichier" : "aucun fichier"
      );

      const response = await createSubject(formData);
      const newSubject = response.subject || response;

      console.log("Sujet créé avec succès!");
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
        className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-orange-600 transition-colors"
        onClick={handleOpenModal}
      >
        <span className="text-white text-xl">+</span>
      </div>

      {/* Popup de création de post */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div>
          <h2 className="text-xl font-semibold mb-4">Créer un post</h2>

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
                placeholder="Le sport et la Sclérose en plaque"
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
                Images
              </label>
              <div
                onClick={handleClickUpload}
                className="w-full p-4 border border-gray-300 rounded-md text-center cursor-pointer bg-orange-100 hover:bg-orange-200 transition-colors"
              >
                <span className="text-orange-500">Cliquer pour ajouter</span>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {images.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {images.length} image(s) sélectionnée(s)
                  </p>
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
                placeholder="Le sport et la Sclérose en Plaques, comment composer avec les symptômes ?"
              />
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Notre équipe va vérifier l'éligibilité de votre post, il sera
              disponible sur la plateforme dans les plus brefs délais.
              <br />
              N'oubliez pas d'activer les notifications pour que nous puissions
              vous informer lorsqu'il sera en ligne !
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? "Création en cours..." : "Valider"}
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
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Demande envoyée
          </h2>
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
