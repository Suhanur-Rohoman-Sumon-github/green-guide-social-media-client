"use client";
import { Textarea } from "@nextui-org/input";
import Image from "next/image";
import React, { useRef, useState, useEffect, FormEvent } from "react";
import { BiSolidPaperPlane, BiSolidPhotoAlbum } from "react-icons/bi";
import Picker from "emoji-picker-react";
import GGForm from "../../Form/GGForm";
import { useUser } from "@/src/context/useProviders";
import { Button } from "@nextui-org/button";
import { CgPoll } from "react-icons/cg";
import { GrSchedulePlay } from "react-icons/gr";
import PollModal from "../../modals/PollModal";

const Posts: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [description, setDescription] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const { setIsLoading: userLoading, setUser, user } = useUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(description);
  };

  const handlePhotoClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEmojiClick = (
    event: any,
    emojiObject: MouseEvent | undefined
  ): void => {
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
      <div className="col-span-1 mx-auto">
        {user && (
          <Image
            className="rounded-full"
            height={40}
            width={40}
            alt="profile"
            src={user?.profilePicture}
          />
        )}
      </div>
      <div className="col-span-10 mt-4 px-2 md:px-0 md:mt-0">
        <GGForm onSubmit={handleSubmit}>
          <label htmlFor="text" className="mr-4">
            <Textarea
              placeholder="whats going on!!!!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=""
              maxRows={8}
            />
          </label>
          <div className="divider"></div>
          <div className="px-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className=" flex gap-2 shadow-2xl"
                onClick={handlePhotoClick}
              >
                <BiSolidPhotoAlbum className="text-xl text-green-500" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
              />

              <div className="text-green-500">
                <PollModal buttons={<CgPoll />} />
              </div>

              <button
                type="button"
                className=" flex gap-2"
                onClick={() => setShowPicker((prev) => !prev)}
              >
                <span className="text-lg  text-green-500 shadow-2xl">
                  <GrSchedulePlay />
                </span>
              </button>
              <button
                type="button"
                className=" flex gap-2"
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
            <Button
              type="submit"
              variant="shadow"
              className="bg-green-500 text-white"
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
