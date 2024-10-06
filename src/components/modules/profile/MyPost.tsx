"use client";
import Image from "next/image";
import React from "react";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import Reaction from "../home/Reaction";
import { useUser } from "@/src/context/useProviders";
import Loading from "../../ui/Loading";
import SkeletonPost from "../../skeleton/SkeletonPost";
import { IPost } from "@/src/types";
import { useGetMyPostsQuery } from "@/src/hook/post.hook";
import AllPostsMap from "../../postMap/AllPostmap";

const MyPost = () => {
  const { user } = useUser();
  const { data: myPosts, isLoading } = useGetMyPostsQuery(
    user?._id ? user?._id : ""
  );

  return (
    <div>
      {isLoading && <SkeletonPost />}
      <AllPostsMap data={myPosts} />
    </div>
  );
};

export default MyPost;
