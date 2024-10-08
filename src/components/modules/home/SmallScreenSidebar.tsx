import Link from "next/link";
import React from "react";
import { BiHome, BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import {
  MdOutlineArticle,
  MdOutlineContactSupport,
  MdRoundaboutLeft,
} from "react-icons/md";
import { Tooltip } from "@nextui-org/tooltip";
import { FaUserFriends } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { LiaUserCheckSolid } from "react-icons/lia";

import SmallScreenProfile from "./SmallscreenProfile";

const SmallScreenSidebar = () => {
  const iconStyle = "text-xl md:text-2xl";

  return (
    <div>
      <div className="flex flex-col gap-y-6">
        {/* Home */}
        <Link href="/">
          <Tooltip content="Home" placement="right">
            <button className={iconStyle}>
              <BiHome />
            </button>
          </Tooltip>
        </Link>
        <Link href="/search">
          <Tooltip content="Explore" placement="right">
            <button className={iconStyle}>
              <BiSearch />
            </button>
          </Tooltip>
        </Link>
        <Link href="/profile">
          <Tooltip content="Profile" placement="right">
            <button className={iconStyle}>
              <CgProfile />
            </button>
          </Tooltip>
        </Link>
        <Link href="/my-favorit-posts">
          <Tooltip content="My Favorite" placement="right">
            <button className={iconStyle}>
              <MdOutlineArticle />
            </button>
          </Tooltip>
        </Link>
        <Link href="/add-friends">
          <Tooltip content="Find Friends" placement="right">
            <button className={iconStyle}>
              <FaUserFriends />
            </button>
          </Tooltip>
        </Link>
        <Link href="/chat">
          <Tooltip content="Messages" placement="right">
            <button className={iconStyle}>
              <FaRegMessage />
            </button>
          </Tooltip>
        </Link>
        <Link href="/pricing">
          <Tooltip content="Premium" placement="right">
            <button className={iconStyle}>
              <LiaUserCheckSolid />
            </button>
          </Tooltip>
        </Link>
        <Link href="/ImageGalleryNew">
          <Tooltip content="Gallery" placement="right">
            <button className={iconStyle}>
              <IoMdImages />
            </button>
          </Tooltip>
        </Link>
        <Link href="/about">
          <Tooltip content="About us" placement="right">
            <button className={iconStyle}>
              <MdRoundaboutLeft />
            </button>
          </Tooltip>
        </Link>
        <Link href="/contact">
          <Tooltip content="Contact us" placement="right">
            <button className={iconStyle}>
              <MdOutlineContactSupport />
            </button>
          </Tooltip>
        </Link>

        {/* Community Profile at the bottom */}
        <div className="md:mt-24  md:hidden">
          <SmallScreenProfile />
        </div>
      </div>
    </div>
  );
};

export default SmallScreenSidebar;
