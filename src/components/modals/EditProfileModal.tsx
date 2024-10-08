import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { FaCamera, FaPen } from "react-icons/fa6";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import GGModal from "./GGModal";
import {
  useGetMeQuery,
  useUpdateProfilePictureMutation,
} from "@/src/hook/user.hook";
import { useUser } from "@/src/context/useProviders";
import { getCurrentUser } from "@/src/service/authServices";
// Import the mutation hook

interface TPostsProps {
  buttonText: ReactNode | string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EditProfileModal = ({ isOpen, setIsOpen, buttonText }: TPostsProps) => {
  const { user } = useUser();
  const { data: myData } = useGetMeQuery(user?._id ? user?._id : "");
  console.log(myData);

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [preview, setPreview] = useState(myData?.profilePicture);
  const [bio, setBio] = useState("This is my bio...");

  const { mutate: updateProfilePicture, data } =
    useUpdateProfilePictureMutation(user?._id ? user?._id : "");
  // Use the mutation

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSaveChanges = async () => {
    if (profilePicture) {
      updateProfilePicture(profilePicture);
    }
  };

  return (
    <GGModal
      buttonText={buttonText}
      isOpen={isOpen}
      isUserProfile={true}
      setIsOpen={setIsOpen}
      sizes="xl"
    >
      <div className="mx-auto p-4 space-y-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

        <div className="flex items-center space-x-6">
          <div className="relative w-32 h-32">
            <Image
              alt="Profile Picture"
              className="rounded-full border-4 border-gray-200 shadow-lg"
              layout="fill"
              src={preview}
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
            save
          </Button>
        </div>
      </div>
    </GGModal>
  );
};

export default EditProfileModal;
