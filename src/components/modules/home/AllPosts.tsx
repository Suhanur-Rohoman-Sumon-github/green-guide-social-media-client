import React from "react";

import { useGetAllPostQuery } from "@/src/hook/post.hook";

import SkeletonPost from "../../skeleton/SkeletonPost";
import AllPostsMap from "../../postMap/AllPostmap";

const AllPosts = () => {
  const { data: posts, isLoading } = useGetAllPostQuery({
    searchTerm: "",
  });

  console.log(posts);

  return (
    <div>
      {isLoading && <SkeletonPost />}
      <AllPostsMap data={posts} />
    </div>
  );
};

export default AllPosts;
