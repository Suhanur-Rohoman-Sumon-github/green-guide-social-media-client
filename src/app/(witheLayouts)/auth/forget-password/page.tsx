"use client";
import { Button } from "@nextui-org/button";
import React from "react";

import GGForm from "@/src/components/Form/GGForm";
import GGInput from "@/src/components/Form/GGInput";
import { useForgetPasswordMutations } from "@/src/hook/auth.hook";
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
      <h2 className="text-xl font-semibold mb-4">Forget Password</h2>
      <GGForm onSubmit={handleSubmit}>
        <div className="mb-4 w-full">
          <GGInput label="Enter your email" name="email" type="text" />
        </div>
        <Button className="bg-green-500 w-full" type="submit">
          Send Reset Email
        </Button>
      </GGForm>
    </div>
  );
};

export default RequestResetEmailForm;
