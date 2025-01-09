import React, { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/src/context/useProviders";
import {
  useLikesQuery,
  useGetSinglePostQuery,
  useSharePostsMutation,
  useCreateLikesMutation,
  useAddFavoritePostsMutations,
} from "@/src/hook/post.hook";

import CommentModal from "../../modals/CommentModal";

const Reaction = ({ postId }: { postId: string }) => {
  // Initialize local state based on fetched data

  const isDownload = useSearchParams();
  const { user } = useUser();
  const userIds = user?._id;
  // Fetch post data (e.g. comments)
  const { data: postData, refetch } = useGetSinglePostQuery(postId);
  // Check if the post is liked by the user

  const { mutate: handleShare } = useSharePostsMutation();
  const { mutate: handleAddFavorite } = useAddFavoritePostsMutations(
    postId,
    user?._id ? user?._id : ""
  );
  const { mutate: handleLike, data } = useCreateLikesMutation(
    postId,
    user?._id ? user._id : ""
  );

  const { data: isLikedData, refetch: likeRefetch } = useLikesQuery(
    user?._id,
    postId
  );
  
  const [isLiked, setIsLiked] = useState<boolean>(isLikedData);
  let userId: string;

  if (user) {
    userId = user!._id;
  }
  const [likesCount, setLikesCount] = useState<number>(postData?.likes?.length);

  const handleLikes = () => {
    if (!userId) {
      toast.error("You need to log in to like posts!");
      return;
    }

    // Update the UI optimistically

    // Trigger mutation to sync with the server
    handleLike({ postId, userId, likeData: { like: isLiked ? "" : userId } });
  };
  const handleCopyLink = async () => {
    try {
      const postURL = `${window.location.origin}/${postId}`;

      await navigator.clipboard.writeText(postURL);
      toast.success("link copy successfully");
    } catch (err) {
      console.error("Failed to copy the link", err);
    }
  };

  useEffect(() => {
    if (postData?.likes?.length >= 0) {
      setLikesCount(postData.likes.length);
    }
    setIsLiked(!!isLikedData);
    refetch();
    likeRefetch();
  }, [postData, isLikedData, refetch, likeRefetch]);

  return (
    <div className="flex justify-between items-center mt-7 mr-24">
      {/* Like/Unlike Button */}

      <div className="flex items-center">
        <button title="Love" onClick={handleLikes}>
          {isLiked ? (
            <FaHeart className="text-pink-500" />
          ) : (
            <FaRegHeart className="" />
          )}
        </button>
        <p className={`ml-1 text-xs ${isLiked ? "text-pink-500" : ""}`}>
          {likesCount}
        </p>
      </div>

      {/* Comments */}
      <div className="flex items-center">
        <CommentModal
          buttonText={
            <div className="flex">
              <FaComment />
              <p className="ml-1 text-xs ">{postData?.comments?.length || 0}</p>
            </div>
          }
          postId={postId}
        />
      </div>

      {/* Share Button */}
      <Dropdown>
        <DropdownTrigger>
          <button title="Share">
            <AiOutlineShareAlt className="hover:rounded-full" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Share Actions">
          <DropdownItem
            key="repost"
            onClick={() => handleShare({ postId, userId: user?._id })}
          >
            Repost
          </DropdownItem>
          <DropdownItem key="writeQuote" onClick={handleCopyLink}>
            copy link
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* add to favorit dropdown */}
      <Dropdown>
        <DropdownTrigger>
          <button title="Add favorit">
            <CiBookmark className="hover:rounded-full" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Share Actions">
          <DropdownItem
            key="favorite"
            onClick={() => handleAddFavorite(postId)}
          >
            Add to Favorite
          </DropdownItem>
          <DropdownItem key="writeQuote">
            <Link href={`${postId}?isDownload=true`}>Download Pdf</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Reaction;
