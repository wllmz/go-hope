import axiosInstance from "../instance/axiosInstance";

export const getReadArticleUser = async () => {
  try {
    const response = await axiosInstance.get("/read");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getReadbyUser = async () => {
  try {
    const response = await axiosInstance.get("/read/user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
