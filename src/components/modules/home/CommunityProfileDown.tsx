"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { logout } from "@/src/service/authServices";
import { useUser } from "@/src/context/useProviders";
import { protectedRoutes } from "@/src/constant";

const CommunityProfileDown = () => {
  const { setIsLoading: userLoading, setUser, user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };
  const handleLogout = () => {
    logout();
    userLoading(true);
    setUser(null);
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center gap-5 px-2 cursor-pointer">
      <Dropdown>
        <DropdownTrigger>
          <div className="flex items-center gap-2">
            <Image
              alt={"sumon"}
              className="rounded-full"
              height={40}
              src={
                user?.profilePicture
                  ? user?.profilePicture
                  : "https://i.ibb.co.com/3BWM0Wz/images.png"
              }
              width={40}
            />
            <div>
              <h1 className="">{`@${user?.username}`}</h1>
              <h1 className="">{`${user?.name.slice(0, 14)}`}</h1>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="copy" onClick={handleLogout}>
            {`Logout from @${user?.username}`}
          </DropdownItem>
          <DropdownItem
            key="settings"
            onClick={() => handleNavigation("/settings")}
          >
            <Link href={"/settings"}> Settings</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Modal controlled by isOpen */}
    </div>
  );
};

export default CommunityProfileDown;
