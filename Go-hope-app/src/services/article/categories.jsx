import axiosInstance from "../instance/axiosInstance";

export const createCategory = async (createCategory) => {
  try {
    const response = await axiosInstance.post("/categories", createCategory);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCategory = async (categoryId, updateCategory) => {
  try {
    const response = await axiosInstance.put(
      `/categories/${categoryId}`,
      updateCategory
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
