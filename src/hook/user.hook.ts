import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  acceptFriendRequest,
  createFriendRequests,
  getAllMyFriends,
  getAllUsers,
  getMe,
  getMyFriendRequests,
  rejectFriendRequests,
  unfriendUserService,
  updateBioService,
  updateCoverPhotoService,
  updateProfilePictureService,
} from "../service/userservices";

// Fetch all users
export const useGetAllUserQuery = () => {
  return useQuery<any, Error>({
    queryKey: ["get-user"],
    queryFn: async () => {
      try {
        const data = await getAllUsers();

        return data?.data;
      } catch (error) {
        throw error; // Ensure errors are passed to the query for proper handling
      }
    },
    staleTime: 10000, // Cache the response for 10 seconds
    refetchOnWindowFocus: false, // Disable refetching when window regains focus
  });
};

// Fetch friend requests
export const useGetAllMyFriendsRequest = (userId: string) => {
  return useQuery<any, Error>({
    queryKey: ["get-all-my-friend-requests", userId],
    queryFn: async () => {
      const data = await getMyFriendRequests(userId);

      return data?.data;
    },
  });
};

// Fetch all friends
export const useGetAllMyFriends = (userId: string) => {
  return useQuery<any, Error>({
    queryKey: ["get-all-my-friends", userId],
    queryFn: async () => {
      const data = await getAllMyFriends(userId);

      return data?.data;
    },
  });
};
export const useGetMeQuery = (userId: string) => {
  return useQuery<any, Error>({
    queryKey: ["get-me", userId],
    queryFn: async () => {
      const data = await getMe(userId);

      return data?.data;
    },
  });
};

// Create friend requests mutation
export const useCreateFriendRequestsMutations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friends: { sender: string; receiver: string }) => {
      return await createFriendRequests({ friends });
    },
    onSuccess: () => {
      toast.success("Friend request sent successfully");
      queryClient.refetchQueries({
        queryKey: ["get-user"],
      });
      queryClient.refetchQueries({
        queryKey: ["get-all-my-friend-requests"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// Accept friend request mutation
export const useAcceptFriendRequestMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendsId: string) => {
      return await acceptFriendRequest(userId, friendsId);
    },
    onSuccess: () => {
      toast.success("Friend accepted successfully");
      queryClient.refetchQueries({
        queryKey: ["get-all-my-friend-requests", userId],
      });
      queryClient.refetchQueries({
        queryKey: ["get-all-my-friends", userId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// Reject friend request mutation
export const useRejectFriendRequestMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendsId: string) => {
      return await rejectFriendRequests(userId, friendsId);
    },
    onSuccess: () => {
      toast.success("Friend rejected successfully");
      queryClient.refetchQueries({
        queryKey: ["get-all-my-friend-requests", userId],
      });
      queryClient.refetchQueries({
        queryKey: ["get-all-my-friends", userId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProfilePictureMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profilePicture: File) => {
      return await updateProfilePictureService(profilePicture, userId);
    },
    onSuccess: (data) => {
      toast.success("Profile picture updated successfully");
      // Optionally refetch user data or other queries here
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCoverPhotoMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (coverPhoto: File) => {
      return await updateCoverPhotoService({ coverPhoto, userId });
    },
    onSuccess: () => {
      toast.success("Cover photo updated successfully");
      // Optionally refetch user data or other queries here
      queryClient.invalidateQueries({
        queryKey: ["get-me", userId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// Mutation to update bio
export const useUpdateBioMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bio: string) => {
      return await updateBioService({ bio, userId });
    },
    onSuccess: () => {
      toast.success("Bio updated successfully");
      // Optionally refetch user data or other queries here
      queryClient.invalidateQueries({
        queryKey: ["get-me", userId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUnfriendUserMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: string) => {
      return await unfriendUserService(userId, friendId);
    },
    onSuccess: () => {
      toast.success("Unfriended successfully");
      // Invalidate the friends and friend requests queries
      queryClient.invalidateQueries({
        queryKey: ["get-all-my-friends", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-my-friend-requests", userId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
