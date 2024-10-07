import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  acceptFriendRequest,
  createFriendRequests,
  getAllMyFriends,
  getAllUsers,
  getMyFriendRequests,
  rejectFriendRequests,
  updateProfilePictureService,
} from "../service/userservices";
import { FieldValues } from "react-hook-form";

// Fetch all users
export const useGetAllUserQuery = () => {
  return useQuery<any, Error>({
    queryKey: ["get-user"],
    queryFn: async () => {
      const data = await getAllUsers();

      return data?.data;
    },
    // Add loading state
    staleTime: 10000, // Cache time to prevent refetching immediately
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

export const useUpdateProfilePictureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profilePicture: File) => {
      return await updateProfilePictureService(profilePicture);
    },
    onSuccess: () => {
      toast.success("Profile picture updated successfully");
      // Optionally refetch user data or other queries here
      
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
