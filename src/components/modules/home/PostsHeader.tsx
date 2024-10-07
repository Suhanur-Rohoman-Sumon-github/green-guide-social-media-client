import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { BiSolidPaperPlane, BiSolidPhotoAlbum } from "react-icons/bi";
import Picker from "emoji-picker-react";
import { Button } from "@nextui-org/button";
import { CgPoll } from "react-icons/cg";
import { FieldValues } from "react-hook-form";

import { useUser } from "@/src/context/useProviders";
import { useCreatePosts } from "@/src/hook/post.hook";

import GGForm from "../../Form/GGForm";
import PollModal from "../../modals/PollModal";
import { GGTextArea } from "../../Form/GGTextArea";
import Loading from "../../ui/Loading";

const Posts: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const { mutate: handlePosts, isPending } = useCreatePosts();
  // const { data: posts, refetch } = getAllPostsFromDb();
  const handleSubmit = (data: FieldValues): void => {
    const formData = new FormData();

    data.user = user?._id;

    // Adding user id to form data
    formData.append("data", JSON.stringify(data));

    // Adding other form data

    // Adding images
    imageFiles.forEach((image) => {
      formData.append("images", image);
    });

    // Call the mutation to create the post
    handlePosts(formData);

    // // Refetch posts upon success
    // refetch();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);

      setImageFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreview((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  const handleEmojiClick = (
    event: any,
    emojiObject: MouseEvent | undefined
  ) => {
    setDescription((prev) => prev + event.emoji);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid md:grid-cols-12 py-5">
      {isPending && <Loading />}
      <div className="col-span-1 mx-auto">
        {user && (
          <Image
            alt="profile"
            className="rounded-full"
            height={40}
            src={user?.profilePicture}
            width={40}
          />
        )}
      </div>
      <div className="col-span-10 mt-4 px-2 md:px-0 md:mt-0">
        <GGForm onSubmit={handleSubmit}>
          {/* Textarea */}
          <label className="mr-4" htmlFor="text">
            <GGTextArea label="What's Going on?" name="content" />
          </label>

          <div className="divider" />

          {/* Icons for image upload and emoji picker */}
          <div className="flex items-center gap-3">
            <label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="image-upload"
            >
              <BiSolidPhotoAlbum className="text-xl text-green-500" />
              <input
                multiple // Allow multiple files
                accept="image/*"
                id="image-upload"
                style={{ display: "none" }}
                type="file"
                onChange={handleImageChange}
              />
            </label>

            <div className="text-green-500">
              <PollModal buttons={<CgPoll />} />
            </div>

            <button
              className="flex gap-2"
              type="button"
              onClick={() => setShowPicker((prev) => !prev)}
            >
              <span className="text-lg">😀</span>
            </button>

            {/* Emoji Picker */}
            {showPicker && (
              <div ref={pickerRef} className="absolute z-10 mt-[500px]">
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          {/* Image Previews */}
          {imagePreview.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {imagePreview.map((image, index) => (
                <Image
                  key={index}
                  alt={`Preview ${index + 1}`}
                  className="border-2 border-dashed"
                  height={100}
                  src={image}
                  width={100}
                />
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-4">
            <Button
              className="bg-green-500 text-white"
              type="submit"
              variant="shadow"
            >
              <BiSolidPaperPlane />
              Post
            </Button>
          </div>
        </GGForm>
      </div>
    </div>
  );
};

export default Posts;
