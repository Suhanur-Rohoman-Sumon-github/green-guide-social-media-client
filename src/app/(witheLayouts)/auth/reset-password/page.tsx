"use client";
import GGForm from "@/src/components/Form/GGForm";
import GGInput from "@/src/components/Form/GGInput";
import { usePasswordResetMutations } from "@/src/hook/auth.hook";
import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";
import React, { FormEventHandler, useState } from "react";
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
          <GGInput name="email" type="text" label="enter your email " />
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
        <Button type="submit" className="bg-green-500 w-full">
          Reset Password
        </Button>
      </GGForm>
    </div>
  );
};

export default ResetPasswordForm;
