"use client";
import { useUser } from "@/src/context/useProviders";
import {
  useAcceptFriendRequestMutation,
  useGetAllMyFriendsRequest,
  useRejectFriendRequestMutation,
} from "@/src/hook/user.hook";
import { FriendRequest } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

const CommunityProfileRight = () => {
  const { user } = useUser();
  const { data: myRequests, refetch: friendRequestRefetch } =
    useGetAllMyFriendsRequest(user?._id || "");
  const { mutate: acceptFriendRequests } = useAcceptFriendRequestMutation(
    user?._id || ""
  );
  const style = "p-3 border  border-gray-500 mt-5 rounded-xl";

  const { mutate: RejectFriendRequest } = useRejectFriendRequestMutation(
    user?._id || ""
  );

  const handleAcceptRequest = (userId: string) => {
    acceptFriendRequests(userId);
    friendRequestRefetch();
  };

  const handleRejectRequest = (userId: string) => {
    RejectFriendRequest(userId);
    friendRequestRefetch();
  };

  return (
    <div className="px-4 space-y-5">
      {/* Premium Subscription Section */}
      <div className={`${style} flex flex-col gap-3`}>
        <h1 className="text-2xl">
          Subscribe to <span className="text-green-500">Premium</span>
        </h1>
        <p>
          Subscribe to unlock all news and articles, and get weekly newsletters.
        </p>
        <Link href="/pricing">
          <Button className="bg-green-500 text-white w-full" variant="shadow">
            <IoIosNotifications className="mr-2" /> Subscribe
          </Button>
        </Link>
      </div>

      {/* Sponsorship Section */}
      {/* Sponsorship Section */}
      <div
        className={`${style} flex items-center p-4 border border-gray-400 rounded-lg shadow-md`}
      >
        {/* Image Section */}
        <div className="w-1/3">
          <img
            src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg"
            alt="Sponsored Ad"
            className="w-full h-auto rounded-md"
          />
        </div>

        {/* Content Section */}
        <div className="ml-4 w-2/3">
          <h2 className="text-sm font-semibold">Sponsored</h2>
          <p className="mt-2  text-sm">
            Check out our new range of eco-friendly products. 🌱
          </p>
          <Button
            className="bg-green-500 text-white mt-3 px-4 py-2 text-sm rounded-lg"
            variant="shadow"
            as="a"
            href="#"
          >
            Learn More
          </Button>
        </div>
      </div>

      <div
        className={`${style} flex items-center p-4 border border-gray-400 rounded-lg shadow-md mt-4`}
      >
        {/* Image Section */}
        <div className="w-1/3">
          <img
            src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
            alt="Sponsored Ad"
            className="w-full h-full rounded-md"
          />
        </div>

        {/* Content Section */}
        <div className="ml-4 w-2/3">
          <h2 className="text-sm font-semibold">Sponsored</h2>
          <p className="mt-2  text-sm">
            Discover amazing deals on tech gadgets. 📱
          </p>
          <Button
            className="bg-green-500 text-white mt-3 px-4 py-2 text-sm rounded-lg"
            variant="shadow"
            as="a"
            href="#"
          >
            Shop Now
          </Button>
        </div>
      </div>

      <div className="">
        {myRequests?.slice(0, 1).map((request: FriendRequest) => (
          <div
            key={request._id}
            className=" shadow-md hover:shadow-lg transition rounded-lg p-4 flex items-center gap-4 border  border-gray-500 my-2"
          >
            <img
              alt={request?.sender?.name}
              className="w-16 h-16 rounded-full object-cover"
              src={request?.sender?.profilePicture}
            />
            <div className="flex-1 ">
              <h3 className="text-lg font-semibold ">
                {request?.sender?.name}
              </h3>
              <div className="flex gap-2 mt-2">
                <Button
                  className="bg-green-500 text-white "
                  variant="shadow"
                  onClick={() => handleAcceptRequest(request?.sender?._id)}
                >
                  Confirm
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  variant="shadow"
                  onClick={() => handleRejectRequest(request?.sender._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Groups Section */}
      <div className={style}>
        <h1 className="text-2xl my-2">Suggested Groups</h1>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Group Avatar"
              className="rounded-lg w-12 h-12"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Tech Enthusiasts</h3>
              <p className="text-gray-500 text-sm">45K members</p>
            </div>
            <Button
              className="bg-green-500 text-white"
              variant="shadow"
              startContent={<IoMdAdd />}
            >
              Join
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Group Avatar"
              className="rounded-lg w-12 h-12"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Gardening Lovers</h3>
              <p className="text-gray-500 text-sm">22K members</p>
            </div>
            <Button
              className="bg-green-500 text-white"
              variant="shadow"
              startContent={<IoMdAdd />}
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityProfileRight;
