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

const FindFriends = () => {
  const { user } = useUser();
  const { data: Alluser, refetch } = useGetAllUserQuery();
  const { data: myRequests, refetch: friendRequestRefetch } =
    useGetAllMyFriendsRequest(user?._id ? user?._id : "");

  console.log(myRequests);
  const { mutate: createFriendRequests } = useCreateFriendRequestsMutations();
  const { mutate: acceptFriendRequests } = useAcceptFriendRequestMutation(
    user?._id ? user?._id : "",
  );
  const { mutate: RejectFriendRequest } = useRejectFriendRequestMutation(
    user?._id ? user?._id : "",
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Find Friends</h2>

      {/* Friend Requests Section */}
      <h3 className="text-xl font-semibold mb-4">Friend Requests</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {myRequests?.map((user: FriendRequest) => (
          <div
            key={user._id}
            className="shadow-md rounded-lg p-4 flex flex-col border items-center"
          >
            <img
              alt={user?.sender?.name}
              className="w-24 h-24 rounded-full mb-4"
              src={user?.sender?.profilePicture}
            />
            <h3 className="text-lg font-semibold mb-2">{user?.sender?.name}</h3>
            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleAcceptRequest(user?.sender?._id)}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleRejectRequest(user?.sender._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Friends Section */}
      <h3 className="text-xl font-semibold mb-4">Find New Friends</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Alluser?.map((user: IUser) => (
          <div
            key={user._id}
            className="shadow-md rounded-lg border p-4 flex flex-col items-center"
          >
            <img
              alt={user?.name}
              className="w-24 h-24 rounded-full mb-4"
              src={user.profilePicture}
            />
            <h3 className="text-lg font-semibold mb-2">
              {`${user.name?.slice(0, 12)}...`}
            </h3>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleAddFriend(user._id)}
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindFriends;
