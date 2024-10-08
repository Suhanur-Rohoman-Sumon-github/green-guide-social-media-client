"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React from "react";

import { useGetAllUserQuery } from "@/src/hook/user.hook";
import { IUser } from "@/src/types";

const AllUser = () => {
  // Fetch all user data
  const { data: AllUser } = useGetAllUserQuery();

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  return (
    <Table aria-label="User Table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {AllUser?.map((user: IUser) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllUser;
