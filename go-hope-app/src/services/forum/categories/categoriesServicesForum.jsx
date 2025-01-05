import axiosInstance from "../../instance/axiosInstance";

export const getCategories = async (categoriesId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoriesId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
