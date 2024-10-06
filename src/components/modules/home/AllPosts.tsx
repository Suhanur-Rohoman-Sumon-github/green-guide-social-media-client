import Image from "next/image";
import React from "react";
import Reaction from "./Reaction";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { getAllPostsFromDb } from "@/src/hook/post.hook";
import SkeletonPost from "../../skeleton/SkeletonPost";
import { IPost } from "@/src/types";
import Link from "next/link";
import AllPostsMap from "../../postMap/AllPostmap";

const AllPosts = () => {
  const { data: posts, isLoading, error } = getAllPostsFromDb();

  if (error) {
    return <p>Error loading posts: {error.message}</p>;
  }

  return (
    <div>
      {isLoading && <SkeletonPost />}
      <AllPostsMap data={posts} />
    </div>
  );
};

export default AllPosts;
