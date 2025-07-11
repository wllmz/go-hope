import React, { useEffect, useState } from "react";
import { FiPlus, FiUpload } from "react-icons/fi";
import useCategories from "../../../hooks/article/useCategories";
import CategoryRow from "./CategoryRow";
import Modal from "../../../utils/form/modal";
import useUploads from "../../../hooks/uploads/useUploads";

const CategoryManagement = () => {
  const {
    categories,
    loading,
    error,
    createCategoryHandler,
    fetchAllCategories,
    updateCategoryHandler,
    deleteCategoryHandler,
  } = useCategories();

  // Hook pour gérer l'upload d'images
  const {
    isLoading: uploadLoading,
    error: uploadError,
    uploadedImage,
    handleImageUpload,
  } = useUploads();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    category_tittle: "",
    category_image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  // Mettre à jour les données du formulaire quand l'image est uploadée
  useEffect(() => {
    if (uploadedImage && uploadedImage.filePath) {
      setFormData((prev) => ({
        ...prev,
        category_image: uploadedImage.filePath,
      }));
    }
  }, [uploadedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Sauvegarder le fichier pour l'upload ultérieur
      setSelectedImage(file);

      // Créer un aperçu pour l'UI
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload immédiat de l'image
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Si l'upload est en cours, attendre qu'il se termine
      if (uploadLoading) {
        alert("Veuillez attendre que l'image soit téléchargée");
        return;
      }

      if (editingCategory) {
        await updateCategoryHandler(editingCategory._id, formData);
      } else {
        await createCategoryHandler(formData);
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      setFormData({ category_tittle: "", category_image: "" });
      setImagePreview(null);
      setSelectedImage(null);
    } catch (err) {
      
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      category_tittle: category.category_tittle,
      category_image: category.category_image || "",
    });
    setImagePreview(category.category_image);
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (categoryId) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")
    ) {
      try {
        await deleteCategoryHandler(categoryId);
      } catch (err) {
        
      }
    }
  };

  const modalContent = (
    <>
      <h2 className="text-2xl font-bold mb-4">
        {editingCategory ? "Modifier la catégorie" : "Nouvelle catégorie"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Titre</label>
          <input
            type="text"
            value={formData.category_tittle}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category_tittle: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <div className="space-y-2">
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
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
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
            {editingCategory ? "Modifier" : "Créer"}
          </button>
        </div>
      </form>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="">Gestion des catégories</h1>
          <button
            onClick={() => {
              setEditingCategory(null);
              setFormData({ category_tittle: "", category_image: "" });
              setImagePreview(null);
              setSelectedImage(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <FiPlus className="mr-2" />
            Nouvelle catégorie
          </button>
        </div>

        {loading && (
          <p className="text-gray-600 text-lg">Chargement des catégories...</p>
        )}
        {error && (
          <p className="text-red-500 text-lg">
            {error.message || "Erreur lors du chargement des catégories."}
          </p>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-center text-gray-700 font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <CategoryRow
                  key={category._id}
                  category={category}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {modalContent}
        </Modal>
      </div>
    </div>
  );
};

export default CategoryManagement;
