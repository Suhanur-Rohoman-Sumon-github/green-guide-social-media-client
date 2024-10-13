import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import GGModal from "./GGModal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidPaperPlane, BiSolidPhotoAlbum } from "react-icons/bi";
import Picker from "emoji-picker-react";
import { Button } from "@nextui-org/button";
import { FieldValues, useForm } from "react-hook-form";
import GGForm from "../Form/GGForm";
import Loading from "../ui/Loading";
import GGTextArea from "../Form/GGTextArea";
import GGselect from "../Form/GGSelects";
import { useUpdatePostMutations } from "@/src/hook/post.hook";
import { useUser } from "@/src/context/useProviders";

interface TEditPostModalProps {
  buttonText?: React.ReactNode | string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialPostData: {
    postId: string;
    content: string;
    category: string;
    postType: string;
    images: string[] | undefined;
  };
}

const EditePostModal: React.FC<TEditPostModalProps> = ({
  isOpen,
  setIsOpen,
  initialPostData,
}) => {
  const { content, category, postType, images, postId } = initialPostData;
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(images || []);
  const [description, setDescription] = useState<string>(content);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: UpdatePost, isPending } = useUpdatePostMutations(postId);

  const methods = useForm({
    defaultValues: {
      content: description,
      category: category,
      postType: postType,
    },
  });

  const pickerRef = useRef<HTMLDivElement | null>(null);

  // Convert image URLs to File objects
  const convertUrlToFile = async (
    imageUrl: string,
    fileName: string
  ): Promise<File> => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };

  // Handle modal opening and converting existing images
  useEffect(() => {
    const convertImages = async () => {
      if (images) {
        const filePromises = images.map((image, index) =>
          convertUrlToFile(image, `image-${index}.jpg`)
        );
        const convertedFiles = await Promise.all(filePromises);
        setImageFiles(convertedFiles);
      }
    };

    if (isOpen) {
      setDescription(content);
      setImagePreview(images || []);
      convertImages();
    }
  }, [isOpen, images, content]);

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
    { key: "Vegetable Gardening", label: "Vegetable Gardening" },
    { key: "Flower Gardening", label: "Flower Gardening" },
    { key: "Succulent Gardening", label: "Succulent Gardening" },
    { key: "Container Gardening", label: "Container Gardening" },
    { key: "Urban Gardening", label: "Urban Gardening" },
  ];

  const handleSubmit = (data: FieldValues): void => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // Append previous images to the formData
    if (images) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Append new image files to the formData
    imageFiles.forEach((image) => {
      formData.append("images", image);
    });

    // Call the UpdatePost function with the combined images
    UpdatePost(formData);
  };

  return (
    <div>
      {isPending && <Loading />}
      <GGModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="Edit Post"
        sizes="lg"
      >
        <GGForm onSubmit={handleSubmit} defaultValues={methods.getValues()}>
          <label htmlFor="content">
            <GGTextArea
              descriptions={description}
              label="Edit your post"
              name="content"
            />
          </label>

          <div className="flex items-center gap-3 mt-3">
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
              type="button"
              className="flex gap-2"
              onClick={() => setShowPicker((prev) => !prev)}
            >
              <span className="text-lg">😀</span>
            </button>

            <GGselect
              name="category"
              options={categoryOptions}
              label="Category"
            />

            {showPicker && (
              <div ref={pickerRef} className="absolute z-10 mt-[500px]">
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

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

          <div className="flex items-center gap-4 justify-between mt-8">
            <Button
              className="bg-green-500 text-white"
              type="submit"
              variant="shadow"
            >
              <BiSolidPaperPlane />
              Save
            </Button>
          </div>
        </GGForm>
      </GGModal>
    </div>
  );
};

export default EditePostModal;
