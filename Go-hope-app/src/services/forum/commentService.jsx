import axiosInstance from "../instance/axiosInstance";

export const createComment = async (subjectId, commentData) => {
  try {
    const response = await axiosInstance.post(
      `/forum/comments/${subjectId}`,
      commentData
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateComments = async (commentsId, commentData) => {
  try {
    const response = await axiosInstance.post(
      `/forum/comments/${commentsId}`,
      commentData
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteComments = async (commentsId) => {
  try {
    const response = await axiosInstance.delete(
      `/forum/comments/${commentsId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
