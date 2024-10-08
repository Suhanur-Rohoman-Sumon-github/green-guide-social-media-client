import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { BiSolidPaperPlane, BiSolidPhotoAlbum } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import Picker from "emoji-picker-react";
import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";
import { TbBrandOpenai } from "react-icons/tb";

import { useUser } from "@/src/context/useProviders";
import { useCreatePosts } from "@/src/hook/post.hook";
import { useGetMeQuery } from "@/src/hook/user.hook";

import GGForm from "../../Form/GGForm";
import { GGTextArea } from "../../Form/GGTextArea";
import Loading from "../../ui/Loading";
import GGselect from "../../Form/GGSelects";

const Posts: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // State for category
  const [generateWithAI, setGenerateWithAI] = useState<boolean>(false); // State for AI generation
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();

  const { mutate: handlePosts, isPending } = useCreatePosts();
  const { data: myData } = useGetMeQuery(user?._id ? user?._id : "");

  const handleSubmit = (data: FieldValues): void => {
    console.log(data);
    const formData = new FormData();

    data.user = user?._id;
    formData.append("data", JSON.stringify(data));
    imageFiles.forEach((image) => {
      formData.append("images", image);
    });

    handlePosts(formData);
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

  const handleEmojiClick = (event: any) => {
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

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const typeOptions = [
    { key: "free", label: "free" },
    { key: "pro", label: "pro" },
  ];
  const categoryOptions = [
    { key: "Vegetable Gardening ", label: "Vegetable Gardening " },
    { key: "Flower Gardening", label: "Flower Gardening" },
    { key: "Succulent Gardening", label: "Succulent Gardening" },
    { key: "Container Gardening", label: "Container Gardening" },
    { key: "Urban Gardening", label: "Urban Gardening" },
  ];

  return (
    <div className="grid md:grid-cols-12 py-5">
      {isPending && <Loading />}
      <div className="col-span-1 mx-auto">
        {user && (
          <Image
            alt="profile"
            className="rounded-full"
            height={40}
            src={myData?.profilePicture}
            width={40}
          />
        )}
      </div>
      <div className="col-span-10 mt-4 px-2 md:px-0 md:mt-0">
        <GGForm onSubmit={handleSubmit}>
          <label className="mr-4" htmlFor="text">
            <GGTextArea label="What's Going on?" name="content" />
          </label>

          {/* Category Selection */}

          {/* AI Generation Toggle */}

          <div className="divider" />

          <div className="flex items-center gap-3">
            <label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="image-upload"
            >
              <BiSolidPhotoAlbum className="text-xl text-green-500" />
              <input
                multiple
                accept="image/*"
                id="image-upload"
                style={{ display: "none" }}
                type="file"
                onChange={handleImageChange}
              />
            </label>

            <button
              className="flex gap-2"
              type="button"
              onClick={() => setShowPicker((prev) => !prev)}
            >
              <span className="text-lg">😀</span>
            </button>

            <GGselect
              label="category"
              name="category" // This should match the categoryOptions
              options={categoryOptions}
            />
            <GGselect
              label="select post type"
              name="postType" // This should match the typeOptions
              options={typeOptions}
            />

            {showPicker && (
              <div ref={pickerRef} className="absolute z-10 mt-[500px]">
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          {/* Image Previews with Remove Icon */}
          {imagePreview.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {imagePreview.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    alt={`Preview ${index + 1}`}
                    className="border-2 border-dashed h-32"
                    height={100}
                    src={image}
                    width={100}
                  />
                  <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => removeImage(index)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className=" flex items-center gap-4 justify-between mt-8">
            <Button
              className="bg-green-500 text-white"
              type="submit"
              variant="shadow"
            >
              <TbBrandOpenai />
              use AI get magic
            </Button>
            <Button
              className="bg-green-500 text-white"
              size="md"
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
