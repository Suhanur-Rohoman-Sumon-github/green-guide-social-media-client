"use client";
import GGForm from "@/src/components/Form/GGForm";
import GGInput from "@/src/components/Form/GGInput";
import {
  useForgetPasswordMutations,
  usePasswordResetMutations,
} from "@/src/hook/auth.hook";
import { Button } from "@nextui-org/button";
import React from "react";
interface ForgetPasswordData {
  email: string;
}
// Assuming GGInput is your custom input component

const RequestResetEmailForm = () => {
  const { mutate: handlePasswordReset } = useForgetPasswordMutations();

  const handleSubmit = (data: ForgetPasswordData) => {
    const email = data.email;
    handlePasswordReset(email);
    console.log(data);
  };

  return (
    <div className="mt-32">
      <GGForm onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <div className="mb-4 w-full">
          <GGInput name="email" type="text" label="Enter your email" />
        </div>
        <Button type="submit" className="bg-green-500 w-full">
          Send Reset Email
        </Button>
      </GGForm>
    </div>
  );
};

export default RequestResetEmailForm;
