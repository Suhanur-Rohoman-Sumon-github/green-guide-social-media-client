"use client";
import React, { useState } from "react";

import AllPostsMap from "@/src/components/postMap/AllPostmap";
import SkeletonPost from "@/src/components/skeleton/SkeletonPost";
import { useGetAllPostQuery } from "@/src/hook/post.hook";
interface CardData {
  id: number;
  title: string;
  description: string;
}
const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: posts, isLoading } = useGetAllPostQuery({
    searchTerm: searchQuery || "",
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mx-auto p-4 border  border-gray-500">
      <div className="mb-6">
        <input
          className="w-full p-2 border  border-gray-500 border  border-gray-500-gray-300 rounded-md"
          placeholder="Search by category or title"
          type="text"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div>
        <div>
          {isLoading && <SkeletonPost />}
          <AllPostsMap data={posts} />
        </div>
      </div>
    </div>
  );
};

export default Search;
