import React, { useEffect } from "react";
import { FaComment } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import CommentModal from "../../modals/CommentModal";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  useLikes,
  getSinglePostsFromDB,
  useSharePostsMutation,
  useCreateLikesMutation,
  useAddFavoritePostsMutations,
} from "@/src/hook/post.hook";
import { useUser } from "@/src/context/useProviders";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Reaction = ({ postId }: { postId: string }) => {
  const isDownload = useSearchParams();

  const { user } = useUser();
  const userIds = user?._id;

  // Fetch post data (e.g. comments)
  const { data: postData, refetch } = getSinglePostsFromDB(postId);

  // Check if the post is liked by the user
  const { data: handleAddLikesIsLikes, refetch: likeRefetch } = useLikes(
    user?._id,
    postId
  );

  useEffect(() => {
    refetch();
    likeRefetch();
  }, [refetch]);

  const { mutate: handleShare } = useSharePostsMutation(postId, user?._id);
  const { mutate: handleAddFavorite } = useAddFavoritePostsMutations(
    postId,
    user?._id ? user?._id : ""
  );
  const { mutate: handleLike } = useCreateLikesMutation();
  let userId: string;
  if (user) {
    userId = user!._id;
  }

  const handleLikes = () => {
    if (user?._id) {
      handleLike({ postId, userId, likeData: { like: user._id } });
      likeRefetch();
      refetch();
    }
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

  return (
    <div className="flex justify-between items-center mt-7 mr-24">
      {/* Like/Unlike Button */}

      <div className="flex items-center">
        <button onClick={handleLikes} title="Love">
          {handleAddLikesIsLikes && postData?.likes?.length > 0 ? (
            <FaHeart className="text-pink-500" />
          ) : (
            <FaRegHeart className="" />
          )}
        </button>
        <p
          className={`ml-1 text-xs ${handleAddLikesIsLikes && postData?.likes?.length > 0 ? " ml-1 text-xs text-pink-500" : "ml-1 text-xl"}`}
        >
          {postData?.likes?.length || 0}
        </p>
      </div>

      {/* Comments */}
      <div className="flex items-center">
        <CommentModal
          postId={postId}
          buttonText={
            <div className="flex">
              <FaComment />
              <p className="ml-1 text-xs ">{postData?.comments?.length || 0}</p>
            </div>
          }
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
