"use client";
import Link from "next/link";
import React from "react";
import { SiSimpleanalytics } from "react-icons/si";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import { FaUserFriends } from "react-icons/fa";

import CommunityProfileDown from "../home/CommunityProfileDown";

const AdminSidebar = () => {
  const pathname = usePathname();
  const f = "flex item-center gap-4 text-xl md:text-xl";
  // Function to apply green text for the active route
  const activeStyle = (route: string) =>
    pathname === route ? "text-green-500" : "text-gray-700";

  return (
    <div className="border">
      <div className="flex flex-col gap-6 py-2 fixed  ">
        {/* Main navigation */}
        <Link href={"/admin"}>
          <button className={`${f} ${activeStyle("/admin")}`}>
            <SiSimpleanalytics /> Admin home
          </button>
        </Link>

        <Link href={"/admin/alluser"}>
          <button className={`${f} ${activeStyle("/admin/alluser")}`}>
            <FaUserFriends /> All user
          </button>
        </Link>

        {/* Community profile at the bottom on larger screens */}
        <div className="mt-14 hidden md:block">
          <CommunityProfileDown />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
