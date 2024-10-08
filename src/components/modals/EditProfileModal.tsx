import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Image from "next/image";
import { FaCamera, FaPen } from "react-icons/fa6";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import GGModal from "./GGModal";
import {
  useGetMeQuery,
  useUpdateBioMutation,
  useUpdateCoverPhotoMutation,
  useUpdateProfilePictureMutation,
} from "@/src/hook/user.hook";
import { useUser } from "@/src/context/useProviders";

// Import mutation hooks for profile picture and bio update
import {
  updateCoverPhotoService,
  updateBioService,
} from "@/src/service/userservices";
import Loading from "../ui/Loading";

interface TPostsProps {
  buttonText: ReactNode | string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EditProfileModal = ({ isOpen, setIsOpen, buttonText }: TPostsProps) => {
  const { user } = useUser();
  const { data: myData } = useGetMeQuery(user?._id ? user?._id : "");

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);

  // Preview states for images
  const [profilePreview, setProfilePreview] = useState(myData?.profilePicture);
  const [coverPreview, setCoverPreview] = useState(myData?.coverPhoto);

  // Bio state
  const [bio, setBio] = useState(myData?.bio || "This is my bio...");

  const { mutate: updateProfilePicture, isPending: profilePicturePending } =
    useUpdateProfilePictureMutation(user?._id ? user?._id : "");
  const { mutate: updateCoverPhoto, isPending: coverPhotoPending } =
    useUpdateCoverPhotoMutation(user?._id ? user?._id : "");
  const { mutate: updateBio, isPending: BioPending } = useUpdateBioMutation(
    user?._id ? user?._id : ""
  );

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setProfilePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPhoto(e.target.files[0]);
      setCoverPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSaveChanges = async () => {
    if (profilePicture) {
      updateProfilePicture(profilePicture);
    }
    if (coverPhoto) {
      updateCoverPhoto(coverPhoto);
    }
    if (bio !== myData?.bio) {
      updateBio(bio);
    }
    setIsOpen(false);
  };

  return (
    <div>
      {BioPending ||
        coverPhotoPending ||
        (profilePicturePending && <Loading />)}
      <GGModal
        buttonText={buttonText}
        isOpen={isOpen}
        isUserProfile={true}
        setIsOpen={setIsOpen}
        sizes="xl"
      >
        <div className="mx-auto p-4 space-y-8 w-full">
          <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

          {/* Cover Photo Update */}
          <div className="relative h-48">
            <Image
              alt="Cover Photo"
              className="object-cover rounded-lg shadow-md bg-cover bg-center"
              layout="fill"
              src={coverPreview}
            />
            <label className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700">
              <FaCamera />
              <input
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleCoverPhotoChange}
              />
            </label>
          </div>

          {/* Profile Picture Update */}
          <div className="flex items-center space-x-6">
            <div className="relative w-32 h-32">
              <Image
                alt="Profile Picture"
                className="rounded-full border-4 border-gray-200 shadow-lg"
                layout="fill"
                src={profilePreview}
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
          </div>

          <Divider />

          {/* Bio Update */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Bio</h2>
            <Textarea
              fullWidth
              placeholder="Write a short bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <Button className="flex items-center" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </div>
      </GGModal>
    </div>
  );
};

export default EditProfileModal;
