import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptFriendRequest, createFriendRequests, getAllMyFriends, getAllUsers, getMyFriendRequests, rejectFriendRequests } from "../service/userservices";
import { toast } from "sonner";

export const useGetAllUserQuery = () => {
  return useQuery<any, Error>({
    queryKey: ["get user"],
    queryFn: async () => {
      const data = await getAllUsers();
      return data?.data;
    },
  });
};
export const useGetAllMyFriendsRequest = (userId:string) => {
  return useQuery<any, Error>({
    queryKey: ["get all my posts"],
    queryFn: async () => {
      const data = await getMyFriendRequests(userId);
      return data?.data;
    },
  });
};
export const useGetAllMyFriends = (userId:string) => {
  return useQuery<any, Error>({
    queryKey: ["get all my friends"],
    queryFn: async () => {
      const data = await getAllMyFriends(userId);
      return data?.data;
    },
  });
};



export const useCreateFriendRequestsMutations = () => {
  return useMutation({
    mutationFn: async (friends: { sender: string; receiver: string }) => {
      // Pass the friends object inside another object as expected by FriendsProps
      return await createFriendRequests({ friends });
    },
    onSuccess: () => {
      toast.success("Friend request sent successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
export const useAcceptFriendRequestMutation = (userId:string) => {
  return useMutation({
    mutationFn: async (friendsId:string) => {
      // Pass the friends object inside another object as expected by FriendsProps
      return await acceptFriendRequest(userId,friendsId);
    },
    onSuccess: () => {
      toast.success("Friend accept  successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
export const useRejectFriendRequestMutation = (userId:string) => {
  return useMutation({
    mutationFn: async (friendsId:string) => {
      // Pass the friends object inside another object as expected by FriendsProps
      return await rejectFriendRequests(userId,friendsId);
    },
    onSuccess: () => {
      toast.success("Friend reject  successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
