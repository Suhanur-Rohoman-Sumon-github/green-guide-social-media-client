import { FieldValues } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addFavoritePosts,
  createComments,
  createLikes,
  createPosts,
  creteShare,
  getAllPosts,
  getFavoritePosts,
  getIsLikes,
  getMyPosts,
  getSinglePosts,
} from "../service/postsServices";
import { ICommentData } from "../components/modals/CommentModal";

// Hook to create posts
export const useCreatePosts = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["create posts"],
    mutationFn: async (postsData) => {
      await createPosts(postsData);
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      // Invalidate the posts query after a new post is created
      queryClient.invalidateQueries(["get-posts"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Hook to get all posts
export const getAllPostsFromDb = () => {
  return useQuery<any, Error>({
    queryKey: ["get-posts"],
    queryFn: async () => {
      const data = await getAllPosts();
      return data?.data;
    },
  });
};

// Hook to get a single post
export const getSinglePostsFromDB = (postId: string) => {
  return useQuery<any, Error>({
    queryKey: ["get single posts", postId],
    queryFn: async () => {
      const data = await getSinglePosts(postId);
      return data?.data;
    },
    enabled: Boolean(postId),
  });
};

// Hook to check if a user liked a post
export const useLikes = (userId: string | undefined, postId: string) => {
  return useQuery<any, Error>({
    queryKey: ["get is liked", postId, userId],
    queryFn: async () => {
      const data = await getIsLikes(userId, postId);
      return data;
    },
    enabled: Boolean(postId && userId),
  });
};

// Hook to get user's posts
export const useGetMyPostsQuery = (userId: string) => {
  return useQuery<any, Error>({
    queryKey: ["get my posts", userId],
    queryFn: async () => {
      const data = await getMyPosts(userId);
      return data?.data;
    },
    enabled: Boolean(userId),
  });
};
export const useGetAllFavoritePostQuery = (userId: string) => {
  return useQuery<any, Error>({
    queryKey: ["get my favorite posts", userId],
    queryFn: async () => {
      const data = await getFavoritePosts(userId);
      return data?.data;
    },
    enabled: Boolean(userId),
  });
};

// Hook to share posts
export const useSharePostsMutation = (postId: string, userId: string | undefined) => {
  return useMutation<void, Error, { postId: string; userId: string | undefined }>({
    mutationKey: ["share posts"],
    mutationFn: async ({ postId, userId }) => {
      if (!userId) {
        throw new Error("User ID is required to share a post");
      }
      await creteShare(postId, userId);
    },
    onSuccess: () => {
      toast.success("Post shared successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Hook to create likes
export const useCreateLikesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { postId: string; userId: string; likeData: { like: string } }>({
    mutationKey: ["create likes"],
    mutationFn: async ({ postId, userId, likeData }) => {
      await createLikes(postId, userId, likeData);
    },
    onSuccess: () => {
      toast.success("Post liked successfully");
      // Invalidate the posts query after a like is created
      queryClient.invalidateQueries(["get posts"]); 
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useCreateCommentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { postId: string;  commentData:ICommentData }>({
    mutationKey: ["create comments"], // Updated mutation key
    mutationFn: async ({ postId,  commentData }) => {
      await createComments(postId,  commentData);
    },
    onSuccess: () => {
      toast.success("Comment added successfully");
      // Invalidate the posts query after a comment is created
      queryClient.invalidateQueries(["get posts"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useAddFavoritePostsMutations = (postId: string , userId:string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { }>({
    mutationKey: ["create favorite posts"], 
    mutationFn: async ({   }) => {
      await addFavoritePosts(postId,  userId);
    },
    onSuccess: () => {
      toast.success("Favorite added successfully");
      // Invalidate the posts query after a comment is created
      queryClient.invalidateQueries(["get posts"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
