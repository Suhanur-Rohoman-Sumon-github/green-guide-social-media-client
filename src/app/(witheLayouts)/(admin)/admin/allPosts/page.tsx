"use client";
import { useGetAllPostQuery } from "@/src/hook/post.hook";
import { IPost } from "@/src/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

const page = () => {
  // Fetch all posts data
  const { data: AllPosts } = useGetAllPostQuery({ searchTerm: "" });

  return (
    <Table aria-label="Posts Table">
      <TableHeader>
        <TableColumn>POST TITLE</TableColumn>
        <TableColumn>AUTHOR</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        {AllPosts?.map((post: IPost) => (
          <TableRow key={post._id}>
            <TableCell>{post.postType}</TableCell>
            <TableCell>{post.user?.name}</TableCell>
            <TableCell>{post.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default page;
