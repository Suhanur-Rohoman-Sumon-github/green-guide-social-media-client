"use client";
import React from "react";

import { useGetAllFavoritePostQuery } from "@/src/hook/post.hook";
import { useUser } from "@/src/context/useProviders";

import AllPostsMap from "../../postMap/AllPostmap";
import SkeletonPost from "../../skeleton/SkeletonPost";

const MyFavoritPage = () => {
  const { user } = useUser();
  const { data: MyFavorite, isLoading } = useGetAllFavoritePostQuery(
    user?._id ? user?._id : "",
  );

  return (
    <div className="border">
      {isLoading && <SkeletonPost />}
      <AllPostsMap data={MyFavorite} />
    </div>
  );
};

export default MyFavoritPage;
