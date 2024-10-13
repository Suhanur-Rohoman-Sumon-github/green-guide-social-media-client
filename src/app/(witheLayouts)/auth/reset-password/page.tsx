"use client";
import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";
import React from "react";

import GGForm from "@/src/components/Form/GGForm";
import GGInput from "@/src/components/Form/GGInput";
import { usePasswordResetMutations } from "@/src/hook/auth.hook";
// Assuming GGInput is your custom input component

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  interface ResetPasswordData {
    email: string;
    token: string | null;
    password: string;
  }

  const { mutate: handlePasswordReset } = usePasswordResetMutations();
  const handleSubmit = (data: ResetPasswordData) => {
    data.token = token;
    handlePasswordReset(data);
    console.log(data);
  };

  return (
    <div className="mt-32">
      <GGForm onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <div className="mb-4 w-full ">
          <GGInput label="enter your email " name="email" type="text" />
          <div className="mt-8">
            <GGInput
              fullWidth={true}
              islogin={true}
              label="Password"
              name="newPassword"
              type="password"
            />
          </div>
        </div>
        <Button className="bg-green-500 w-full" type="submit">
          Reset Password
        </Button>
      </GGForm>
    </div>
  );
};

export default ResetPasswordForm;
