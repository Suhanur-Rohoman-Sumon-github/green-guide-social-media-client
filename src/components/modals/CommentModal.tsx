import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { Button } from "@nextui-org/button";

import { useUser } from "@/src/context/useProviders";
import {
  getSinglePostsFromDB,
  useCreateCommentsMutation,
} from "@/src/hook/post.hook";
import { IComment } from "@/src/types";

import GGForm from "../Form/GGForm";
import GGInput from "../Form/GGInput";

import GGModal from "./GGModal";

interface TPostsProps {
  buttonText: ReactNode | string;
  postId: string;
}

export interface ICommentData {
  user: string;
  content: any;
}

const CommentModal = ({ buttonText, postId }: TPostsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  // Use the getSinglePostsFromDB hook directly
  const { data, isLoading, isError } = getSinglePostsFromDB(postId);
  const { mutate: handleComments } = useCreateCommentsMutation();
  const handlesubmit = (data: any) => {
    const content = data.comments;
    const users = user?._id as string;
    const postIds = postId;
    const commentData: ICommentData = {
      content,
      user: users,
    };

    // Call the mutation
    handleComments({ postId: postIds, commentData });
  };

  // Log loading and error states for debugging
  useEffect(() => {
    if (isLoading) {
      console.log("Loading post data...");
    }
    if (isError) {
      console.error("Error fetching post data:", isError);
    }
  }, [isLoading, isError]);

  return (
    <GGModal
      buttonText={buttonText}
      isComment={true}
      isOpen={isModalOpen}
      isProfile={false}
      setIsOpen={setIsModalOpen}
      sizes={"2xl"}
    >
      <div className="flex flex-col h-full">
        <div className="sticky top-0 z-10 p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-semibold">{`${data?.user?.name} posts`}</h1>
        </div>

        <div className="overflow-y-auto flex-grow max-h-[400px] px-2 py-3">
          {/* Check if data exists before rendering */}
          {data ? (
            <div className="grid grid-cols-8 my-4">
              <div className="col-span-1 mx-auto">
                <Image
                  alt="profile pic"
                  className="rounded-full"
                  height={40}
                  src={data?.user?.profilePicture}
                  width={40}
                />
              </div>
              <div className="col-span-7">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold">
                    {data?.user?.name || "Username"}
                  </h1>
                  <p className="text-green-500">
                    <TbRosetteDiscountCheck />
                  </p>
                  <h1 className="font-semibold text-gray-500">{`@${data?.user?.username || "username"}`}</h1>
                  <p>.</p>
                  {new Date(data?.createdAt).toLocaleTimeString()}
                </div>
                <div>
                  <p className="my-6">
                    {data.content || "This is an example post text."}
                  </p>
                  <Image
                    alt="post image"
                    height={200}
                    src={
                      data.imageUrl ||
                      "https://i.ibb.co/3Mrx6Fg/blank-profile.webp"
                    }
                    width={400}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p>No post data available.</p>
          )}

          {/* Render specific comments related to the fetched post */}
          {data?.comments?.length > 0 &&
            data.comments.map((comment: IComment, index: number) => (
              <div key={index} className="grid grid-cols-8 px-2 py-3 my-4">
                <div className="col-span-1 mx-auto">
                  <Image
                    alt="profile pic"
                    className="rounded-full"
                    height={40}
                    width={40}
                    src={
                      comment?.user?.profilePicture ||
                      "https://example.com/default-profile-pic.png"
                    } // Fallback for profile picture
                  />
                </div>
                <div className="col-span-7 border rounded-md p-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold">
                      {comment?.user?.name || "Anonymous"}{" "}
                      {/* Fallback for username */}
                    </h1>
                    <p className="text-green-500">
                      <TbRosetteDiscountCheck />
                    </p>
                    <h1 className="font-semibold text-gray-500">{`@${comment?.user?.username || "username"}`}</h1>
                    <p>.</p>
                  </div>
                  <div>
                    <p>{comment.content}</p> {/* Comment content */}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Input Section */}
        <div className="sticky bottom-0 border-t mt-4 pt-4">
          <div className="flex items-center gap-2 p-2">
            <Image
              alt="profile pic"
              className="rounded-full"
              height={40}
              src={user?.profilePicture || ""}
              width={40}
            />
            <GGForm onSubmit={handlesubmit}>
              <div className="flex items-center w-full gap-8">
                <GGInput
                  label="comments"
                  name="comments"
                  size="sm"
                  type="text"
                />
                <Button className="bg-green-500 text-white" type="submit">
                  post
                </Button>
              </div>
            </GGForm>
          </div>
        </div>
      </div>
    </GGModal>
  );
};

export default CommentModal;
