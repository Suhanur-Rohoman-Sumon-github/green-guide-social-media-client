"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import Image from "next/image";

import { ThemeSwitch } from "@/src/components/ui/theme-switch"; // Ensure this component works

export const AllNavbar = () => {
  return (
    <NextUINavbar className="fixed" maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand>
          <NextLink passHref href="/">
            <div className="flex items-center">
              <Image
                alt="Logo"
                height={40}
                src="https://i.ibb.co/kqFvCWJ/Black-White-Minimalist-Logo-removebg-preview.png"
                width={40}
              />
              <span className="font-bold text-green-500">Green Guide</span>
            </div>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
