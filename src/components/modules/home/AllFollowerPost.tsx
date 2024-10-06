import Image from "next/image";
import React from "react";
import Reaction from "./Reaction";

const AllFollowerPost = () => {
  const posts = [
    {
      id: 1,
      name: "sumon",
      username: "sumon",
      content: "kahli",
      image: "https://i.ibb.co/3Mrx6Fg/blank-profile.webp",
    },
    {
      id: 1,
      name: "sumon",
      username: "sumon",
      content: "kahli",
      image: "https://i.ibb.co/3Mrx6Fg/blank-profile.webp",
    },
    {
      id: 1,
      name: "sumon",
      username: "sumon",
      content: "kahli",
      image: "https://i.ibb.co/3Mrx6Fg/blank-profile.webp",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="grid grid-cols-8 border-t border-b px-2 py-3 my-4"
        >
          <div className="col-span-1 mx-auto">
            <Image
              className="rounded-full"
              height={40}
              width={40}
              alt="profile pic"
              src={post.image}
            />
          </div>

          <div className="col-span-7">
            <div className="flex items-center gap-2">
              {/* Name Box */}
              <h1 className="text-lg font-semibold">{post.name}</h1>
              <h1 className="font-semibold text-gray-500">{`@${post.username}`}</h1>
            </div>
            <div>
              {/* Text Box */}
              <p>{post.content}</p>
              <Image
                height={300}
                width={400}
                alt="post image"
                src={post.image}
              />
            </div>
            {/* Bottom Like Comment Share Nav */}
            <Reaction />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllFollowerPost;
