import React, { useEffect, useState } from "react";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import loginValidationSchema from "@/src/schema/loginValidationSchema";
import { useUserLogin } from "@/src/hook/auth.hook";
import { useUser } from "@/src/context/useProviders";

import Loading from "../ui/Loading";
import GGInput from "../Form/GGInput";
import GGForm from "../Form/GGForm";

import GGModal from "./GGModal";

interface TProps {
  isProfile: boolean;
  isOpens: boolean;
}

const LoginModal = ({ isProfile = false, isOpens }: TProps) => {
  const [isOpen, setIsOpen] = useState(isOpens ? isOpens : false);
  const [defaultValues, setDefaultValues] = useState({
    email: "",
    password: "",
  });

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const handleLogin: SubmitErrorHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  const handleAdminLoginClick = () => {
    setDefaultValues({
      email: "admin@example.com",
      password: "admin123",
    });
  };

  const handleUserLoginClick = () => {
    setDefaultValues({
      email: "user@example.com",
      password: "user123",
    });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
    setIsOpen(false);
  }, [isPending, isSuccess]);

  return (
    <GGModal
      buttonText={`${isProfile ? "Add existing account" : "Login Now"}`}
      isOpen={isOpen}
      isProfile={isProfile}
      setIsOpen={setIsOpen}
      sizes="2xl"
    >
      {isPending && <Loading />}
      <div className="flex items-center justify-center h-[400px]">
        <div className="w-full">
          <GGForm defaultValues={defaultValues} onSubmit={handleLogin}>
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            {/* Email Input */}
            <GGInput label="Email" name="email" type="email" />
            <Spacer y={1.5} />

            {/* Password Input */}
            <GGInput
              fullWidth={true}
              islogin={true}
              label="Password"
              name="password"
              type="password"
            />

            <Spacer y={2} />
            {/* Forgot Password Link */}
            <div className="">
              <Link href="/auth/forget-password">
                <p className="underline">Forgot Password?</p>
              </Link>
            </div>
            <Spacer y={2} />

            {/* Buttons for Admin and User Login */}
            <div className="flex justify-between mb-4">
              <Button
                color="primary"
                variant="flat"
                onPress={handleAdminLoginClick}
              >
                Admin Login
              </Button>
              <Button
                color="primary"
                variant="flat"
                onPress={handleUserLoginClick}
              >
                User Login
              </Button>
            </div>

            {/* Login Button */}
            <Button
              className="w-full"
              color="primary"
              type="submit"
              variant="shadow"
            >
              Login
            </Button>

            <Spacer y={1.5} />
          </GGForm>
        </div>
      </div>
    </GGModal>
  );
};

export default LoginModal;
