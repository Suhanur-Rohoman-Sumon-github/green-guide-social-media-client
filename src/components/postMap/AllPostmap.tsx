import { IPost } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import Reaction from "../modules/home/Reaction";

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
              className="rounded-full"
              height={80}
              width={40}
              alt="profile pic"
              src={post?.user?.profilePicture || "/default-profile.png"}
            />
          </div>

          <div className="col-span-7">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">
                {post?.user?.name?.slice(0, 14)}
              </h1>{" "}
              <p className="text-green-500">
                <TbRosetteDiscountCheck />
              </p>
              <h1 className="font-semibold text-gray-500">{`@${post.user?.username}`}</h1>{" "}
              <p>.</p>
              <p>{new Date(post.createdAt).toLocaleTimeString()}</p>
            </div>

            <div>
              <p className="my-8">{post.content}</p>
              <Link href={`${post._id}`}>
                {post.imageUrl && (
                  <Image
                    height={300}
                    width={400}
                    alt="post image"
                    src={post.imageUrl}
                  />
                )}
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
