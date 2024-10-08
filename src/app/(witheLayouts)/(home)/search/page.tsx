"use client";
import AllPostsMap from "@/src/components/postMap/AllPostmap";
import SkeletonPost from "@/src/components/skeleton/SkeletonPost";
import { useGetAllPostQuery } from "@/src/hook/post.hook";
import React, { useState } from "react";
interface CardData {
  id: number;
  title: string;
  description: string;
}
const page = () => {
  const { data: posts, isLoading } = useGetAllPostQuery();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <div className="container mx-auto p-4 border">
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search for something..."
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

export default page;
