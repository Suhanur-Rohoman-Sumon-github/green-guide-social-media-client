"use client";
import React from "react";

import { useUser } from "@/src/context/useProviders";
import { useGetMyPostsQuery } from "@/src/hook/post.hook";

import SkeletonPost from "../../skeleton/SkeletonPost";
import AllPostsMap from "../../postMap/AllPostmap";

const MyPost = () => {
  const { user } = useUser();
  const { data: myPosts, isLoading } = useGetMyPostsQuery(
    user?._id ? user?._id : "",
  );

  return (
    <div>
      {isLoading && <SkeletonPost />}
      <AllPostsMap data={myPosts} isMyPosts={true} />
    </div>
  );
};

export default MyPost;
