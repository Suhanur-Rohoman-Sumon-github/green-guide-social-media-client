import React from "react";

import { getAllPostsFromDb } from "@/src/hook/post.hook";

import SkeletonPost from "../../skeleton/SkeletonPost";
import AllPostsMap from "../../postMap/AllPostmap";

const AllPosts = () => {
  const { data: posts, isLoading } = getAllPostsFromDb();

  return (
    <div>
      {isLoading && <SkeletonPost />}
      <AllPostsMap data={posts} />
    </div>
  );
};

export default AllPosts;
