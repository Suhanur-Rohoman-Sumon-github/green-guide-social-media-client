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
              alt="profile pic"
              className="rounded-full"
              height={40}
              src={post.image}
              width={40}
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
                alt="post image"
                height={300}
                src={post.image}
                width={400}
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
