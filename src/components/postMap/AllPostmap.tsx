import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { formatDistanceToNow } from "date-fns";
import { GrTransaction } from "react-icons/gr";
import { IPost } from "@/src/types";

import Reaction from "../modules/home/Reaction";

import LightGelary from "./LightGelary";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import {
  useDeletePostMutation,
  useDeleteSharedPostMutation,
} from "@/src/hook/post.hook";
import { useUser } from "@/src/context/useProviders";

const AllPostsMap = ({
  data,
  isMyPosts = false,
}: {
  data: IPost[];
  isMyPosts?: boolean;
}) => {
  const { user } = useUser();
  const userId = user?._id ? user?._id : "";
  const { mutate: DeleteMyPost } = useDeletePostMutation();
  const { mutate: DeletePostId } = useDeleteSharedPostMutation();

  const handleDeletePost = (postId: string, isCreated: boolean) => {
    console.log(isCreated);
    if (isCreated) {
      DeleteMyPost({ userId, postId });
      console.log("this is created posts ");
    } else {
      DeletePostId({ userId, postId });
      console.log("this is shared posts ");
    }
  };
  return (
    <div>
      {data?.map((post: IPost) => (
        <div
          key={post._id}
          className="grid grid-cols-8 border-t border-b px-2 py-3 my-4"
        >
          <div className="col-span-1 mx-auto">
            <Link href={"/profile"}>
              <Image
                alt="profile pic"
                className="rounded-full"
                height={80}
                src={post?.user?.profilePicture || "/default-profile.png"}
                width={40}
              />
            </Link>
          </div>

          <div className="col-span-7">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">
                {post?.user?.name?.slice(0, 14)}
              </h1>
              {post?.user?.currentState === "pro" && (
                <p className="text-green-500">
                  <TbRosetteDiscountCheck />
                </p>
              )}
              <h1 className="font-semibold text-gray-500">{`@${post.user?.username}`}</h1>
              <p>.</p>
              <p>{formatDistanceToNow(new Date(post.createdAt))} ago</p>{" "}
              {/* Display "time ago" */}
              {/* Dropdown for post actions */}
              {isMyPosts && (
                <div className="ml-24">
                  <Dropdown>
                    <DropdownTrigger>
                      <p className="cursor-pointer">
                        <GrTransaction />
                      </p>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="edit">Edit Posts</DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() =>
                          handleDeletePost(
                            post._id,
                            post.postType === "created" ? true : false
                          )
                        }
                      >
                        Delete Posts
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              )}
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
