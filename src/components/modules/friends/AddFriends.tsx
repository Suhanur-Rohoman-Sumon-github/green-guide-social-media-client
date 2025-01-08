"use client";
import { useState, useEffect } from "react";

import { useUser } from "@/src/context/useProviders";
import {
  useAcceptFriendRequestMutation,
  useCreateFriendRequestsMutations,
  useGetAllMyFriendsRequest,
  useGetAllUserQuery,
  useRejectFriendRequestMutation,
} from "@/src/hook/user.hook";
import { FriendRequest, IUser } from "@/src/types";
import { Button } from "@nextui-org/button";

const FindFriends = () => {
  const { user } = useUser();
  const { data: Alluser, refetch, isFetching } = useGetAllUserQuery();
  const { data: myRequests, refetch: friendRequestRefetch } =
    useGetAllMyFriendsRequest(user?._id || "");

  const { mutate: createFriendRequests } = useCreateFriendRequestsMutations();
  const { mutate: acceptFriendRequests } = useAcceptFriendRequestMutation(
    user?._id || ""
  );
  const { mutate: RejectFriendRequest } = useRejectFriendRequestMutation(
    user?._id || ""
  );

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (Alluser) {
      setUsers(Alluser);
    }
  }, [Alluser]);

  const handleAcceptRequest = (userId: string) => {
    acceptFriendRequests(userId);
    friendRequestRefetch();
    refetch();
  };

  const handleRejectRequest = (userId: string) => {
    RejectFriendRequest(userId);
    friendRequestRefetch();
    refetch();
  };

  const handleAddFriend = (userId: string) => {
    if (!user?._id) {
      console.error("User ID is not defined");
      return;
    }

    const friends = {
      sender: user._id,
      receiver: userId,
    };

    createFriendRequests(friends);
    friendRequestRefetch();
    refetch();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 ">Find Friends</h2>

      {/* Friend Requests */}
      <h3 className="text-xl font-semibold mb-4 ">Friend Requests</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {myRequests?.map((request: FriendRequest) => (
          <div
            key={request._id}
            className=" shadow-md hover:shadow-lg transition rounded-lg p-4 flex items-center gap-4 border"
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
                  className="bg-green-500 text-white text-white"
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

      {/* Find New Friends */}
      <h3 className="text-xl font-semibold mb-4 ">Find New Friends</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {Alluser?.map((user: IUser) => (
          <div
            key={user._id}
            className=" border shadow-md hover:shadow-lg transition rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover mb-4"
              src={user.profilePicture}
            />
            <h3 className="text-lg font-semibold  mb-2">{user.name}</h3>
            <Button
              variant="shadow"
              className="bg-green-500 text-white"
              onClick={() => handleAddFriend(user._id)}
            >
              Add Friend
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindFriends;
