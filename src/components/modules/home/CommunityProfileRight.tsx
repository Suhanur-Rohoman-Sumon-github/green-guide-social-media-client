import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React from "react";
import { IoIosNotifications } from "react-icons/io";
const CommunityProfileRight = () => {
  const style = "p-3  border mt-5 rounded-xl";
  const trendingWords = [
    "PakVSInd",
    "SheikhHasina",
    "Morocco_Earthquake",
    "Biden",
  ];
  return (
    <div className="px-4">
      <label htmlFor="search">
        {" "}
        <Input placeholder="search" variant="bordered" className="max-w-xs" />
      </label>
      <div className={`${style} flex flex-col gap-3`}>
        {" "}
        <h1 className="text-2xl mt-2">
          Subscribe to <span className="text-green-500">Premium</span>
        </h1>
        <p className="">
          Subscribe to unlock all news and articles, and get weekly newsletter.
        </p>
        <Button variant="shadow" className="bg-green-500 text-white">
          <IoIosNotifications /> Subscribe
        </Button>
      </div>
      <div className={style}>
        {" "}
        {/*trending*/}
        <h1 className="text-2xl my-2">Trending for you</h1>
        <div className="flex flex-col gap-3 ">
          {trendingWords?.map((word) => (
            <div key={word}>
              <h1 className="text-lg font-semibold"> #{word} </h1>
              <p className="text-gray-500">5,492 posts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityProfileRight;
