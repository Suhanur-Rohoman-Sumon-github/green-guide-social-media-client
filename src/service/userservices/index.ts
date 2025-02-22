import axios from "axios";

import { FriendsProps } from "@/src/types";

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(
      "https://express-server-startar-pack-main.vercel.app/api/v1/users/get-all-user",
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getMyFriendRequests = async (userId: string) => {
  try {
    const { data } = await axios.get(
      `https://express-server-startar-pack-main.vercel.app/api/v1/friends/get-my-friendsRequests/${userId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const acceptFriendRequest = async (
  userId: string,
  friendsId: string,
) => {
  try {
    const { data } = await axios.patch(
      `https://express-server-startar-pack-main.vercel.app/api/v1/friends/accept/${userId}/${friendsId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const rejectFriendRequests = async (
  userId: string,
  friendsId: string,
) => {
  try {
    const { data } = await axios.patch(
      `https://express-server-startar-pack-main.vercel.app/api/v1/friends/reject/${userId}/${friendsId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getAllMyFriends = async (userId: string) => {
  try {
    const { data } = await axios.get(
      `https://express-server-startar-pack-main.vercel.app/api/v1/users/get-all-friends/${userId}/`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
// The mutation function to create a friend request
export const createFriendRequests = async (friends: FriendsProps) => {
  try {
    const { data } = await axios.post(
      "https://express-server-startar-pack-main.vercel.app/api/v1/friends",
      friends,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getMe = async (userId: string) => {
  try {
    const { data } = await axios.get(
      `https://express-server-startar-pack-main.vercel.app/api/v1/users/get-me/${userId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateProfilePictureService = async (
  profilePicture: File,
  userId: string,
): Promise<any> => {
  const formData = new FormData();

  formData.append("profilePicture", profilePicture);

  try {
    const { data } = await axios.post(
      `https://express-server-startar-pack-main.vercel.app/api/v1/users/update-profile/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateCoverPhotoService = async ({
  coverPhoto,
  userId,
}: {
  coverPhoto: File;
  userId: string;
}): Promise<any> => {
  const formData = new FormData();

  formData.append("coverPhoto", coverPhoto);

  try {
    const { data } = await axios.post(
      `https://express-server-startar-pack-main.vercel.app/api/v1/users/update-cover/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error: any) {
    
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Service to update bio
export const updateBioService = async ({
  bio,
  userId,
}: {
  bio: string;
  userId: string;
}): Promise<any> => {
  try {
    const { data } = await axios.patch(
      `https://express-server-startar-pack-main.vercel.app/api/v1/users/update-bio/${userId}`,
      {
        bio,
      },
    );

    return data;
  } catch (error: any) {
    
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Service to unfriend a user
export const unfriendUserService = async (
  userId: string,
  friendId: string,
): Promise<any> => {
  try {
    const { data } = await axios.delete(
      `https://express-server-startar-pack-main.vercel.app/api/v1/users/unfriend-user/${userId}/${friendId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const resetPasswordService = async (
  email: string,
  newPassword: string,
  token: string,
) => {
  try {
    const { data } = await axios.post(
      `https://express-server-startar-pack-main.vercel.app/api/v1/auth/reset-password`,
      { email, newPassword },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const ForgetPasswordServices = async (email: string) => {
  try {
    const { data } = await axios.post(
      'https://express-server-startar-pack-main.vercel.app/api/v1/auth/forget-password',
      { email },
    );
    return data;
  } catch (error: any) {
    console.error('Error details:', error.response || error); // Log error for debugging
    throw new Error(error.response?.data?.message || error.message);
  }
};
