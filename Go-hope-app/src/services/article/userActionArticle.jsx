import axiosInstance from "../instance/axiosInstance";

export const getReadArticleUser = async () => {
  try {
    const response = await axiosInstance.get("/action/read");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getReadbyUser = async () => {
  try {
    const response = await axiosInstance.get("/action/fav/");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
