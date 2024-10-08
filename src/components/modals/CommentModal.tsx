import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { Button } from "@nextui-org/button";

import { useUser } from "@/src/context/useProviders";
import {
  useGetSinglePostQuery,
  useCreateCommentsMutation,
} from "@/src/hook/post.hook";
import { IComment } from "@/src/types";
import { useGetMeQuery } from "@/src/hook/user.hook";

import GGForm from "../Form/GGForm";
import GGInput from "../Form/GGInput";
import Loading from "../ui/Loading";

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
  const { data: myData } = useGetMeQuery(user?._id ? user?._id : "");
  const { data, isLoading, isError, refetch } = useGetSinglePostQuery(postId);
  const { mutate: handleComments, isPending } = useCreateCommentsMutation();

  const handlesubmit = (data: any) => {
    const content = data.comments;
    const users = user?._id as string;
    const commentData: ICommentData = {
      content,
      user: users,
    };

    handleComments({ postId, commentData });
    refetch();
  };

  useEffect(() => {
    if (isLoading) {
      console.log("Loading post data...");
    }
    if (isError) {
      console.error("Error fetching post data:", isError);
    }
  }, [isLoading, isError]);

  // Function to render images based on length
  const renderImages = (images: string[]) => {
    const imageCount = images.length;

    if (imageCount === 1) {
      return (
        <div className="my-4">
          <Image
            alt="post image"
            className="w-full h-64"
            height={200}
            src={images[0]}
            width={400}
          />
        </div>
      );
    } else if (imageCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-2 my-4">
          {images.map((src, index) => (
            <Image
              key={index}
              alt={`post image ${index + 1}`}
              className="w-full h-64"
              height={200}
              src={src}
              width={200}
            />
          ))}
        </div>
      );
    } else if (imageCount === 3) {
      return (
        <div className="my-4">
          <Image
            alt="post image"
            className="w-full h-64"
            height={200}
            src={images[0]}
            width={400}
          />
          <div className="grid grid-cols-2 gap-2">
            {images.slice(1).map((src, index) => (
              <Image
                key={index}
                alt={`post image ${index + 2}`}
                className="w-full"
                height={200}
                src={src}
                width={200}
              />
            ))}
          </div>
        </div>
      );
    } else if (imageCount >= 4) {
      return (
        <div className="grid grid-cols-4 gap-2 my-4 ">
          {images.map((src, index) => (
            <Image
              key={index}
              alt={`post image ${index + 1}`}
              className="w-full h-64"
              height={200}
              src={src}
              width={200}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      {isPending && <Loading />}
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
                    {renderImages(data.imageUrls || [])}
                  </div>
                </div>
              </div>
            ) : (
              <p>No post data available.</p>
            )}

            {data?.comments?.length > 0 &&
              data.comments.map((comment: IComment, index: number) => (
                <div key={index} className="grid grid-cols-8 px-2 py-3 my-4">
                  <div className="col-span-1 mx-auto">
                    <Image
                      alt="profile pic"
                      className="rounded-full"
                      height={40}
                      src={
                        comment?.user?.profilePicture ||
                        "https://example.com/default-profile-pic.png"
                      }
                      width={40}
                    />
                  </div>
                  <div className="col-span-7 border rounded-md p-2">
                    <div className="flex items-center gap-2">
                      <h1 className="text-lg font-semibold">
                        {comment?.user?.name || "Anonymous"}
                      </h1>
                      <p className="text-green-500">
                        <TbRosetteDiscountCheck />
                      </p>
                      <h1 className="font-semibold text-gray-500">{`@${comment?.user?.username || "username"}`}</h1>
                      <p>.</p>
                    </div>
                    <div>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="sticky bottom-0 border-t mt-4 pt-4">
            <div className="flex items-center gap-2 p-2">
              <Image
                alt="profile pic"
                className="rounded-full"
                height={40}
                src={myData?.profilePicture || ""}
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
    </div>
  );
};

export default CommentModal;
