import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { formatDistanceToNow } from "date-fns";

import { IPost } from "@/src/types";

import Reaction from "../modules/home/Reaction";
import LightGelary from "./LightGelary";

const AllPostsMap = ({ data }: { data: IPost[] }) => {
  return (
    <div>
      {data?.map((post: IPost) => (
        <div
          key={post._id}
          className="grid grid-cols-8 border-t border-b px-2 py-3 my-4"
        >
          <div className="col-span-1 mx-auto">
            <Image
              alt="profile pic"
              className="rounded-full"
              height={80}
              src={post?.user?.profilePicture || "/default-profile.png"}
              width={40}
            />
          </div>

          <div className="col-span-7">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">
                {post?.user?.name?.slice(0, 14)}
              </h1>
              <p className="text-green-500">
                <TbRosetteDiscountCheck />
              </p>
              <h1 className="font-semibold text-gray-500">{`@${post.user?.username}`}</h1>
              <p>.</p>
              <p>{formatDistanceToNow(new Date(post.createdAt))} ago</p>{" "}
              {/* Display "time ago" */}
            </div>

            <div>
              <p className="my-8">{post.content}</p>
              <Link href={`${post._id}`}>
                <div className="flex flex-col">
                  <LightGelary images={post.imageUrls} />
                </div>
              </Link>
            </div>

            <Reaction postId={post._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPostsMap;
