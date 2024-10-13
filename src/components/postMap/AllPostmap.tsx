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
import EditePostModal from "../modals/EditePostModal";

import LightGelary from "./LightGelary";

const AllPostsMap = ({
  data,
  isMyPosts = false,
}: {
  data: IPost[];
  isMyPosts?: boolean;
}) => {
  console.log(data);
  const { user } = useUser();
  const userId = user?._id || "";
  const { mutate: DeleteMyPost } = useDeletePostMutation();
  const { mutate: DeletePostId } = useDeleteSharedPostMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<IPost | null>(null);

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

  const [seeMoreStates, setSeeMoreStates] = useState(
    Array(data?.length)?.fill(false),
  );

  const handleSeeMore = (index: number) => {
    const updatedStates = [...seeMoreStates];

    updatedStates[index] = true;
    setSeeMoreStates(updatedStates);
  };

  const handleOpenEditModal = (post: IPost) => {
    setPostToEdit(post);
    setIsOpen(true);
  };

  return (
    <div>
      {data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10">
          <Image
            alt="No Posts Found"
            className="mb-4"
            height={150}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvrHQdL-jOHhdgyyIQADFhVCmu0RDBgbmjNw&s"
            width={150}
          />
          <h2 className="text-lg font-semibold">
            Please create your first post now
          </h2>
        </div>
      ) : (
        data?.map((post: IPost, index: number) => {
          const { shortText, fullText } = truncateText(post.content, 30);
          const isBlurred =
            post.postType === "pro" && post?.user?.currentState === "free";
          const seeMore = seeMoreStates[index];

          return (
            <div
              key={post._id}
              className="relative grid grid-cols-8 border-t border-b px-2 py-3 my-4"
            >
              <div className="col-span-1 mx-auto">
                <Link href={`/user/${post?.user?._id}`}>
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
                          <DropdownItem
                            key="edit"
                            onClick={() => handleOpenEditModal(post)}
                          >
                            Edit Post
                          </DropdownItem>
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
                            Delete Post
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  )}
                </div>

                {/* Content and Image section */}
                <div className={`${isBlurred ? "blur-sm" : ""} relative`}>
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

                  {!isBlurred ? (
                    <Link href={`${post._id}`}>
                      <div className="flex flex-col">
                        <LightGelary images={post.imageUrls} />
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-col">
                      <LightGelary images={post.imageUrls} />
                    </div>
                  )}
                </div>

                <div className={`${isBlurred ? "hidden" : ""}`}>
                  <Reaction postId={post._id} />
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Edit Profile Modal */}
      {isOpen && postToEdit && (
        <EditePostModal
          initialPostData={{
            postId: postToEdit._id,
            content: postToEdit.content,
            category: postToEdit.category,
            images: postToEdit.imageUrls,
            postType: postToEdit.postType,
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default AllPostsMap;
