import axiosInstance from "@/src/lib/AxiosInostance";
import { FriendsProps } from "@/src/types";
import { FieldValues } from "react-hook-form";

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users/get-all-user");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getMyFriendRequests = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/friends/get-my-friendsRequests/${userId}`,
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
    const { data } = await axiosInstance.patch(
      `/friends/accept/${userId}/${friendsId}`,
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
    const { data } = await axiosInstance.patch(
      `/friends/reject/${userId}/${friendsId}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getAllMyFriends = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/users/get-all-friends/${userId}/`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
// The mutation function to create a friend request
export const createFriendRequests = async (friends: FriendsProps) => {
  try {
    const { data } = await axiosInstance.post("/friends", friends);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getMe = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/get-me/${userId}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const updateProfilePictureService = async (
  profilePicture: File,
  userId:string
): Promise<any> => {
  const formData = new FormData();
  formData.append('profilePicture', profilePicture);

  try {
    const { data } = await axiosInstance.post(`/users/update-profile/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

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
    const { data } = await axiosInstance.post(`/users/update-cover/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
    const { data } = await axiosInstance.patch(`/users/update-bio/${userId}`, { bio });

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Service to unfriend a user
export const unfriendUserService = async (userId: string, friendId: string): Promise<any> => {
  
  try {
    const { data } = await axiosInstance.delete(`/users/unfriend-user/${userId}/${friendId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};