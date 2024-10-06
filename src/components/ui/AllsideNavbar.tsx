"use client";
import { useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { ThemeSwitch } from "@/src/components/ui/theme-switch"; // Ensure this component works
import NextLink from "next/link";
import Image from "next/image";

export const AllNavbar = () => {
  return (
    <NextUINavbar className="fixed" maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand>
          <NextLink href="/" passHref>
            <div className="flex items-center">
              <Image
                src="https://i.ibb.co/kqFvCWJ/Black-White-Minimalist-Logo-removebg-preview.png"
                alt="Logo"
                height={40}
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
