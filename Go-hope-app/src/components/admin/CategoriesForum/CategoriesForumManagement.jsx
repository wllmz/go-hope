import React, { useEffect, useState } from "react";
import useCategoriesForum from "../../../hooks/forum/useCategorie";
import CategoriesForumRow from "./CategoriesForumRow";
import Modal from "../../../utils/form/modal";
import FormInput from "../../../utils/form/FormInput";
import { FiUpload } from "react-icons/fi";
import useUploads from "../../../hooks/uploads/useUploads";

const CategoriesForumManagement = () => {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoriesForum();

  // Hook pour l'upload d'images
  const {
    isLoading: uploadLoading,
    error: uploadError,
    uploadedImage,
    handleImageUpload,
  } = useUploads();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    categorie: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Mettre à jour l'URL de l'image après l'upload
  useEffect(() => {
    if (uploadedImage && uploadedImage.filePath) {
      setFormData((prev) => ({
        ...prev,
        image: uploadedImage.filePath,
      }));
    }
  }, [uploadedImage]);

  const handleCreateClick = () => {
    setFormData({ categorie: "", image: "" });
    setImagePreview(null);
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    // Gérer le cas où category.categorie est un objet
    const categoryName =
      category.categorie && typeof category.categorie === "object"
        ? category.categorie.name || ""
        : category.categorie || "";
    // Pour l'image : si c'est un objet, on extrait par exemple la propriété "url"
    const imageUrl =
      category.image && typeof category.image === "object"
        ? category.image.url || ""
        : category.image || "";
    setFormData({
      categorie: categoryName,
      image: imageUrl,
    });
    setImagePreview(imageUrl);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (uploadLoading) {
      alert("Veuillez attendre que l'image soit téléchargée");
      return;
    }

    try {
      await createCategory(formData);
      setIsCreateModalOpen(false);
      setImagePreview(null);
      fetchCategories();
    } catch (err) {
      
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!selectedCategory?._id) return;

    if (uploadLoading) {
      alert("Veuillez attendre que l'image soit téléchargée");
      return;
    }

    try {
      await updateCategory(selectedCategory._id, formData);
      setIsEditModalOpen(false);
      setImagePreview(null);
      fetchCategories();
    } catch (err) {
      
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory?._id) return;

    try {
      await deleteCategory(selectedCategory._id);
      setIsDeleteModalOpen(false);
      fetchCategories();
    } catch (err) {
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  const renderCategories = () => {
    if (!Array.isArray(categories)) {
      return null;
    }

    return categories
      .map((category) => {
        if (!category || typeof category !== "object") {
          return null;
        }

        return (
          <CategoriesForumRow
            key={category._id || `temp-${Date.now()}`}
            category={category}
            onEdit={() => handleEditClick(category)}
            onDelete={() => handleDeleteClick(category)}
          />
        );
      })
      .filter(Boolean);
  };

  // Contenu du formulaire commun aux modales de création et d'édition
  const renderFormContent = (isCreate) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom de la catégorie *
        </label>
        <FormInput
          type="text"
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
          placeholder="Nom de la catégorie"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image *
        </label>
        <div className="space-y-3">
          {imagePreview && (
            <div className="relative w-32 h-32">
              <img
                src={imagePreview}
                alt="Aperçu"
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
          <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <FiUpload className="w-6 h-6 text-gray-600" />
              <span className="font-medium text-gray-600">
                {imagePreview ? "Changer l'image" : "Ajouter une image"}
              </span>
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {uploadLoading && (
            <p className="text-blue-500 text-sm mt-1">
              Téléchargement en cours...
            </p>
          )}
          {uploadError && (
            <p className="text-red-500 text-sm mt-1">Erreur: {uploadError}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion des catégories du forum
          </h1>
          <button
            onClick={handleCreateClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Créer une catégorie
          </button>
        </div>

        {loading && (
          <p className="text-gray-600 text-lg">Chargement des catégories...</p>
        )}
        {error && (
          <p className="text-red-500 text-lg">
            Erreur lors du chargement des catégories.
          </p>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Nom de la catégorie
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Image
                </th>
                <th className="px-6 py-3 text-center text-gray-700 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{renderCategories()}</tbody>
          </table>
        </div>
      </div>

      {/* Modal de création */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <h2 className="text-2xl font-bold mb-4">
          Créer une nouvelle catégorie
        </h2>
        <form onSubmit={handleSubmitCreate}>
          {renderFormContent(true)}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={uploadLoading}
              className={`px-4 py-2 ${
                uploadLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-lg transition-colors`}
            >
              Créer
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de modification */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Modifier la catégorie</h2>
        <form onSubmit={handleSubmitEdit}>
          {renderFormContent(false)}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={uploadLoading}
              className={`px-4 py-2 ${
                uploadLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-lg transition-colors`}
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de suppression */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h2 className="text-2xl font-bold mb-4">Confirmer la suppression</h2>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est
          irréversible.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesForumManagement;
