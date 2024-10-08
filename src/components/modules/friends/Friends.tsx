// Ensure you're importing from the correct path
"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { useEffect } from "react";

import {
  useGetAllMyFriends,
  useUnfriendUserMutation,
} from "@/src/hook/user.hook";
import { useUser } from "@/src/context/useProviders";
interface IFriends {
  _id: string;
  profilePicture: string;
  name: string;
}

const Friends = () => {
  const { user } = useUser();
  const { mutate: handleUnfriendMutations } = useUnfriendUserMutation(
    user?._id ? user?._id : ""
  );
  const { data: AllFriends, refetch } = useGetAllMyFriends(
    user?._id ? user?._id : ""
  );

  console.log(AllFriends);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleUnfriend = (friendId: string) => {
    handleUnfriendMutations(friendId);
  };

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Recently Added Friends</h1>
      <Table className="">
        <TableHeader>
          <TableColumn>Profile</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Username</TableColumn>
        </TableHeader>
        <TableBody>
          {AllFriends?.map((friend: IFriends) => (
            <TableRow key={friend._id}>
              <TableCell>
                <Avatar size="lg" src={friend.profilePicture} />
              </TableCell>
              <TableCell>{friend.name}</TableCell>

              <TableCell>
                <Button
                  className="bg-green-500 text-white"
                  color="primary"
                  size="sm"
                  onClick={() => handleUnfriend(friend._id)}
                >
                  Unfriend
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Friends;
