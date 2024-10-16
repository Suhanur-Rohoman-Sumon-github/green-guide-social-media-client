"use client";
import React from "react";

import { useUser } from "@/src/context/useProviders";
import { useGetMyPostsQuery } from "@/src/hook/post.hook";

import SkeletonPost from "../../skeleton/SkeletonPost";
import AllPostsMap from "../../postMap/AllPostmap";

interface TPostsProps {
  isUserProfile?: boolean;
  UserId?: string;
}

const MyPost = ({ UserId }: TPostsProps) => {
  const { user } = useUser();

  // Determine which ID to use

  // Only query if we have a valid userId
  const {
    data: myPosts,
    isLoading,
    isError,
  } = useGetMyPostsQuery(UserId ? UserId : "");

  if (isLoading) {
    return <SkeletonPost />;
  }

  if (isError) {
    return <p>There was an error fetching posts.</p>;
  }

  if (!myPosts || myPosts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div>
      <AllPostsMap data={myPosts} isMyPosts={true} />
    </div>
  );
};

export default MyPost;
