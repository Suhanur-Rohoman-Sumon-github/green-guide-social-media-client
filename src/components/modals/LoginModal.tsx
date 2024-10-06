import React, { useEffect, useState } from "react";
import GGModal from "./GGModal";
import GGForm from "../Form/GGForm";
import GGInput from "../Form/GGInput";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/src/schema/loginValidationSchema";
import { useUserLogin } from "@/src/hook/auth.hook";
import { useUser } from "@/src/context/useProviders";
import Loading from "../ui/Loading";
import { useRouter, useSearchParams } from "next/navigation";

interface TProps {
  isProfile: boolean;
  isOpens: boolean;
}
const LoginModal = ({ isProfile = false, isOpens }: TProps) => {
  const [isOpen, setIsOpen] = useState(isOpens ? isOpens : false);
  console.log(isOpen);
  const serchPerams = useSearchParams();
  const redirect = serchPerams.get("redirect");
  const router = useRouter();

  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const handleLogin: SubmitErrorHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
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
      isProfile={isProfile}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonText={`${isProfile ? "Add existing account" : "Login Now"}`}
      sizes="2xl"
    >
      {isPending && <Loading />}
      <div className="flex items-center justify-center h-[400px] ">
        <div className="w-full ">
          <GGForm
            onSubmit={handleLogin}
            resolver={zodResolver(loginValidationSchema)}
          >
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            {/* Email Input */}
            <GGInput type="email" label="Email" name="email" />
            <Spacer y={1.5} />

            {/* Password Input */}
            <GGInput
              islogin={true}
              type="password"
              label="Password"
              name="password"
              fullWidth={true}
            />

            <Spacer y={2} />

            {/* Login Button */}
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              className="w-full"
            >
              Login
            </Button>
          </GGForm>
        </div>
      </div>
    </GGModal>
  );
};

export default LoginModal;
