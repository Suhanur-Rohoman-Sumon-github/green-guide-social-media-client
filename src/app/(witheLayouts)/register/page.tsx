"use client";
// pages/register.js
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";

import RegisterModal from "@/src/components/modals/RegisterModal";
import LoginModal from "@/src/components/modals/LoginModal";
// Adjust import based on Next UI version

const RegisterPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen ">
      <div className="relative w-full md:w-1/2">
        <Link href={"/"}>
          <Image
            alt="Registration Image"
            className=""
            layout="fill"
            objectFit="cover"
            src="https://i.ibb.co/kqFvCWJ/Black-White-Minimalist-Logo-removebg-preview.png"
          />
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10 ">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Log In to GardenConnect
        </h1>
        <p className="text-lg mb-8 text-center text-gray-600">Start now</p>

        <Button className="mb-4 w-full md:w-3/4" color="primary">
          <img
            alt="Google"
            className="w-5 h-5 inline mr-2"
            src="https://i.ibb.co.com/8MSzcYn/google-icon-2048x2048-pks9lbdv-removebg-preview.png"
          />
          Continue with Google
        </Button>

        <Button className="mb-4 w-full md:w-3/4" color="primary">
          <img
            alt="GitHub"
            className="w-5 h-5 inline mr-2"
            src="https://i.ibb.co.com/0nvmDfT/Git-Hub-Symbol-removebg-preview.png"
          />
          Continue with GitHub
        </Button>

        <div className="my-4 flex items-center w-full md:w-3/4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <RegisterModal />
        <p className="text-sm  text-center my-4">Already have an account?</p>
        <LoginModal isOpens={false} isProfile={false} />
      </div>
    </div>
  );
};

export default RegisterPage;
