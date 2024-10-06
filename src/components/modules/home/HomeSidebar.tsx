"use client";
import Link from "next/link";
import React from "react";
import { BiHome, BiSearch, BiPencil, BiSolidPaperPlane } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import {
  MdOutlineArticle,
  MdEventNote,
  MdForum,
  MdRoundaboutLeft,
  MdOutlineContactSupport,
} from "react-icons/md";
import { LiaUserCheckSolid } from "react-icons/lia";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import CommunityProfileDown from "./CommunityProfileDown";
import { FaRegMessage } from "react-icons/fa6";
import { Button } from "@nextui-org/button";
import { IoIosNotifications } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
const HomeSidebar = () => {
  const pathname = usePathname();
  const f = "flex gap-4 text-xl md:text-xl";

  // Function to apply green text for the active route
  const activeStyle = (route: string) =>
    pathname === route ? "text-green-500" : "text-gray-700";

  return (
    <div>
      <div className="flex flex-col gap-6 py-2 fixed md:h-screen mt-9">
        {/* Main navigation */}
        <Link href={"/"}>
          <button className={`${f} ${activeStyle("/")}`}>
            <BiHome /> Home
          </button>
        </Link>
        <button className={`${f} ${activeStyle("/explore")}`}>
          <BiSearch /> Explore
        </button>
        <Link href={"/profile"}>
          <button className={`${f} ${activeStyle("/profile")}`}>
            <CgProfile /> Profile
          </button>
        </Link>
        <Link href={"/my-favorit-posts"}>
          <button className={`${f} ${activeStyle("/my-favorit-posts")}`}>
            <MdOutlineArticle /> My Favorite
          </button>
        </Link>
        <Link href={"/chat"}>
          <button className={`${f} ${activeStyle("/chat")}`}>
            <FaRegMessage /> Messages
          </button>
        </Link>

        <Link href={"/pricing"}>
          <button className={`${f} ${activeStyle("/pricing")}`}>
            <LiaUserCheckSolid /> Premium
          </button>
        </Link>
        <Link href={"/about"}>
          <button className={`${f} ${activeStyle("/about")}`}>
            <MdRoundaboutLeft /> About us
          </button>
        </Link>
        <Link href={"/contact"}>
          <button className={`${f} ${activeStyle("/contact")}`}>
            <MdOutlineContactSupport /> Contact us
          </button>
        </Link>
        <Link href={"/add-friends"}>
          <button className={`${f} ${activeStyle("/add-friends")}`}>
            <FaUserFriends /> Find Friends
          </button>
        </Link>
        <Button variant="shadow" className="bg-green-500 text-white">
          <BiSolidPaperPlane /> Posts
        </Button>

        {/* Community profile at the bottom on larger screens */}
        <div className="mt-14 hidden md:block">
          <CommunityProfileDown />
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
