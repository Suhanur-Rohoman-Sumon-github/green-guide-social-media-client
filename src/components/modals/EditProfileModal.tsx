import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Image from "next/image";
import { FaCamera, FaPen } from "react-icons/fa6";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";

import GGModal from "./GGModal";
interface TPostsProps {
  buttonText: ReactNode | string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EditProfileModal = ({ isOpen, setIsOpen, buttonText }: TPostsProps) => {
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150",
  );
  const [coverPhoto, setCoverPhoto] = useState(
    "https://via.placeholder.com/1200x300",
  );
  const [bio, setBio] = useState("This is my bio...");
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  return (
    <GGModal
      buttonText={buttonText}
      isOpen={isOpen}
      isUserProfile={true}
      setIsOpen={setIsOpen}
      sizes="xl"
    >
      <div className=" mx-auto p-4 space-y-8  w-full">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

        {/* Profile Picture Section */}
        <div className="flex items-center space-x-6">
          <div className="relative w-32 h-32">
            <Image
              alt="Profile Picture"
              className="rounded-full border-4 border-gray-200 shadow-lg"
              layout="fill"
              src={profilePicture}
            />
            <label className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700">
              <FaPen />
              <input
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>

          {/* Edit Profile Picture Button */}
        </div>

        {/* Divider */}
        <Divider />

        {/* Cover Photo Section */}
        <div className="relative h-48 w-full bg-gray-200 rounded-lg shadow-md">
          <Image
            alt="Cover Photo"
            className="object-cover rounded-lg shadow-md bg-cover bg-center"
            layout="fill"
            src={coverPhoto}
          />
          <label className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700">
            <FaCamera />
            <input
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleCoverPhotoChange}
            />
          </label>
        </div>

        {/* Divider */}
        <Divider />

        {/* Bio Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          <Textarea fullWidth placeholder="Write a short bio..." value={bio} />
        </div>

        {/* Save Button */}
        <div className="mt-4">
          <Button className="flex items-center">Save Changes</Button>
        </div>
      </div>
    </GGModal>
  );
};

export default EditProfileModal;
