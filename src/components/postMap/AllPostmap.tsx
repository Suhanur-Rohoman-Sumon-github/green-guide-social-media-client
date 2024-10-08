import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { formatDistanceToNow } from "date-fns";
import { GrTransaction } from "react-icons/gr";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { IPost } from "@/src/types";
import {
  useDeletePostMutation,
  useDeleteSharedPostMutation,
} from "@/src/hook/post.hook";
import { useUser } from "@/src/context/useProviders";

import Reaction from "../modules/home/Reaction";

import LightGelary from "./LightGelary";

const AllPostsMap = ({
  data,
  isMyPosts = false,
}: {
  data: IPost[];
  isMyPosts?: boolean;
}) => {
  const { user } = useUser();
  const userId = user?._id || "";
  const { mutate: DeleteMyPost } = useDeletePostMutation();
  const { mutate: DeletePostId } = useDeleteSharedPostMutation();

  const handleDeletePost = (postId: string, isCreated: boolean) => {
    if (isCreated) {
      DeleteMyPost({ userId, postId });
    } else {
      DeletePostId({ userId, postId });
    }
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");

    return words?.length > wordLimit
      ? { shortText: words.slice(0, wordLimit).join(" "), fullText: text }
      : { shortText: text, fullText: text };
  };

  // Array of booleans to manage "see more" state for each post
  const [seeMoreStates, setSeeMoreStates] = useState(
    Array(data?.length)?.fill(false),
  );

  const handleSeeMore = (index: number) => {
    const updatedStates = [...seeMoreStates];

    updatedStates[index] = true;
    setSeeMoreStates(updatedStates);
  };

  return (
    <div>
      {data?.map((post: IPost, index: number) => {
        const { shortText, fullText } = truncateText(post.content, 30);
        // Determine blur state for each post individually
        const isBlurred =
          post.postType === "pro" && post?.user?.currentState === "free";
        const seeMore = seeMoreStates[index];

        // Check user and post state
        console.log("User current state:", user?.currentState);
        console.log(`Post ID: ${post._id}, postType: ${post.postType}`);

        return (
          <div
            key={post._id}
            className="relative grid grid-cols-8 border-t border-b px-2 py-3 my-4"
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
                <p>{formatDistanceToNow(new Date(post.createdAt))} ago</p>

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
                              post.postType === "created",
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

              {/* Content and Image section */}
              <div className={`${isBlurred ? "blur-sm" : ""} relative`}>
                {/* Post Content */}
                <p className="my-8">
                  {seeMore ? fullText : shortText}
                  {!seeMore && fullText?.length > shortText?.length && (
                    <button
                      className="text-green-500 ml-2"
                      onClick={() => handleSeeMore(index)}
                    >
                      See More
                    </button>
                  )}
                </p>

                {/* Post Images */}
                <Link href={`${post._id}`}>
                  <div className="flex flex-col">
                    <LightGelary images={post.imageUrls} />
                  </div>
                </Link>

                {/* Blur Overlay for Pro Posts */}
              </div>

              {/* Reaction Component */}
              <div className={`${isBlurred ? "hidden" : ""}`}>
                <Reaction postId={post._id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllPostsMap;
