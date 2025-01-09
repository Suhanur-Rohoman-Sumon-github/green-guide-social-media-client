"use client";
import React, { Suspense } from "react";
import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";
import GGForm from "@/src/components/Form/GGForm";
import GGInput from "@/src/components/Form/GGInput";
import { usePasswordResetMutations } from "@/src/hook/auth.hook";

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
    data.token = token; // Use the token retrieved from search params
    handlePasswordReset(data);
    
  };

  return (
    <div className="mt-32">
      <GGForm onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <div className="mb-4 w-full ">
          <GGInput label="Enter your email" name="email" type="text" />
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

// Wrapper Component with Suspense
const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
