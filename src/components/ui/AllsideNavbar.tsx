"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";

import { ThemeSwitch } from "@/src/components/ui/theme-switch";

export const AllNavbar = () => {
  const gardeningQuotes = [
    "To plant a garden is to believe in tomorrow. – Audrey Hepburn",
    "The love of gardening is a seed once sown that never dies. – Gertrude Jekyll",
    "Gardens are not made by sitting in the shade. – Rudyard Kipling",
    "Gardening adds years to your life and life to your years. – Unknown",
    "Flowers are the music of the ground. – Edwin Curran",
    "A garden requires patient labor and attention. – Liberty Hyde Bailey",
    "In every gardener, there is a child who believes in The Seed Fairy. – Robert Breault",
    "Life begins the day you start a garden. – Chinese Proverb",
  ];

  return (
    <NextUINavbar
      className="fixed non-print-content  shadow-md w-full"
      maxWidth="xl"
      position="sticky"
    >
      {/* Left side with logo */}
      <NavbarContent className="max-w-xl mx-auto" justify="start">
        <NavbarBrand>
          <NextLink passHref href="/">
            <div className="flex items-center space-x-2">
              <Image
                alt="Logo"
                height={60}
                src="https://i.ibb.co/kqFvCWJ/Black-White-Minimalist-Logo-removebg-preview.png"
                width={60}
              />
            </div>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Center with Marquee */}
      <NavbarContent
        className="w-full max-w-xl mx-auto hidden md:block mt-8"
        justify="center"
      >
        <NavbarItem className="w-full">
          <Marquee pauseOnHover gradient={false} speed={50}>
            {gardeningQuotes.map((quote, index) => (
              <span key={index} className="mx-4 text-sm ">
                {quote}
              </span>
            ))}
          </Marquee>
        </NavbarItem>
      </NavbarContent>

      {/* Right side with Theme Switch */}
      <NavbarContent className="max-w-xl mx-auto" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
