"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { FaUserEdit, FaUserFriends } from "react-icons/fa";
import Link from "next/link";

import { useUser } from "@/src/context/useProviders";

import EditProfileModal from "../../modals/EditProfileModal";
import { useGetMeQuery } from "@/src/hook/user.hook";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { data: myData } = useGetMeQuery(user?._id ? user?._id : "");
  console.log(myData);

  console.log(user?.profilePicture);

  console.log(user);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Cover Photo */}
      <div className="relative h-48">
        <Image
          alt="Cover Photo"
          className="object-cover rounded-lg shadow-md bg-cover bg-center"
          layout="fill"
          src="https://i.ibb.co.com/9stCLLd/278570326-1155325175267831-4816482073671559265-n-1.jpg"
        />

        <div className="absolute bottom-[-30px] left-4 w-32 h-32 ">
          <Image
            alt="Profile Picture"
            className="rounded-full border-4 border-white shadow-lg"
            layout="fill"
            src={
              myData?.profilePicture
                ? myData?.profilePicture
                : "https://via.placeholder.com/1200x300"
            }
          />
        </div>
      </div>

      {/* User Information */}
      <div className="flex flex-col items-start mt-16">
        <h1 className="text-2xl font-bold">{`${user?.name}(${user?.username})`}</h1>
        <p className="text-gray-600">Bio: Lorem ipsum dolor sit amet.</p>
        <p className="text-gray-600">Location: City, Country</p>
        <div className="flex space-x-4 mt-2">
          <EditProfileModal
            buttonText={
              <div className="flex">
                <FaUserEdit />
                <p className="ml-1 text-xs ">Edit profile</p>
              </div>
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Link href={"/friends"}>
            {" "}
            <Button variant="shadow">
              <FaUserFriends /> view friends
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
