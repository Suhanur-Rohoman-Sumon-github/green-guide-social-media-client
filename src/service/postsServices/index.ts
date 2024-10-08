"use server";

import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInostance";

export const createPosts = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getAllPosts = async (searchTerm: string) => {
  try {
    if (searchTerm) {
      const { data } = await axiosInstance.get(
        `/posts?sort=likes&searchTerm=${searchTerm}`,
      );

      return data;
    } else {
      const { data } = await axiosInstance.get(`/posts?sort=likes`);

      return data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSinglePosts = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${postId}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getIsLikes = async (
  userId: string | undefined,
  postId: string,
) => {
  try {
    const response = await axiosInstance.get(
      `/posts/isReacted/${userId}/${postId}`,
    );

    return { isLiked: response.data.data };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMyPosts = async (userId: string | undefined) => {
  try {
    const { data } = await axiosInstance.get(`/posts/my-profile/${userId}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const creteShare = async (postId: string, userId: string) => {
  try {
    // Replace ':userId' and ':postId' with actual values
    const { data } = await axiosInstance.patch(
      `/posts/share/${postId}/${userId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const createLikes = async (
  postId: string,
  userId: string,
  likeData: { like: string },
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/likes/${postId}/${userId}`,
      likeData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const createComments = async (
  postId: string,
  commentData: { user: string; content: string },
) => {
  try {
    const { data } = await axiosInstance.patch(`/posts/${postId}`, commentData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const addFavoritePosts = async (
  postId: string,
  userId: string | undefined,
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/addFavorite/${postId}/${userId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getFavoritePosts = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/posts/All-Favorite/${userId}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deletePost = async (postId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/posts/delete-myPost/${postId}/${userId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const deleteSharedPost = async (postId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/posts/delete-sharedPosts/${postId}/${userId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
