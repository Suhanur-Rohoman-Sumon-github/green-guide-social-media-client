import Link from "next/link";
import React from "react";
import { BiHome, BiSearch, BiPencil } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdEventNote, MdForum, MdOutlineArticle } from "react-icons/md";
import { Tooltip } from "@nextui-org/tooltip";

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
        <Link href="/">
          <Tooltip content="Explore" placement="right">
            <button className={iconStyle}>
              <BiSearch />
            </button>
          </Tooltip>
        </Link>
        <Link href="/">
          <Tooltip content="Profile" placement="right">
            <button className={iconStyle}>
              <CgProfile />
            </button>
          </Tooltip>
        </Link>
        <Link href="/">
          <Tooltip content="My Posts" placement="right">
            <button className={iconStyle}>
              <MdOutlineArticle />
            </button>
          </Tooltip>
        </Link>
        <Link href="/">
          <Tooltip content="Comments" placement="right">
            <button className={iconStyle}>
              <BiPencil />
            </button>
          </Tooltip>
        </Link>
        <Link href="/">
          <Tooltip content="Discussions" placement="right">
            <button className={iconStyle}>
              <MdForum />
            </button>
          </Tooltip>
        </Link>
        <Link href="/">
          <Tooltip content="Events" placement="right">
            <button className={iconStyle}>
              <MdEventNote />
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
