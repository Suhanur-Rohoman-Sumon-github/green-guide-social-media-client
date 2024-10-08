import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { registerValidationSchema } from "@/src/schema/registerValidationschema";
import { useUserRegistretion } from "@/src/hook/auth.hook";

import Loading from "../ui/Loading";
import GGInput from "../Form/GGInput";
import GGForm from "../Form/GGForm";

import GGModal from "./GGModal";

const RegisterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    mutate: handleUserRegistretion,
    isPending,
    isSuccess,
  } = useUserRegistretion();
  const handleRegister = (data: any) => {
    const userData = {
      ...data,
    };

    handleUserRegistretion(userData);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      setIsOpen(false); // Close modal after successful registration
      router.push("/");
    }
  }, [isPending, isSuccess]);

  return (
    <GGModal
      buttonText={"create account"}
      isOpen={isOpen} // Pass isOpen state
      isProfile={false}
      setIsOpen={setIsOpen} // Pass setIsOpen function
      sizes="2xl"
    >
      {isPending && <Loading />}
      <div className="p-8 rounded-lg">
        <GGForm
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={handleRegister}
        >
          <h2 className="text-2xl font-semibold text-center">Register</h2>
          <Spacer y={1} />

          {/* Username Input */}
          <GGInput label="Username" name="username" type="text" />
          <Spacer y={1.5} />

          {/* Name Input */}
          <GGInput label="Name" name="name" type="text" />
          <Spacer y={1.5} />

          {/* Email Input */}
          <GGInput label="Email" name="email" type="email" />
          <Spacer y={1.5} />

          {/* Password Input */}
          <GGInput
            islogin={true}
            label="Password"
            name="password"
            type="password"
          />
          <Spacer y={1.5} />

          {/* Confirm Password Input */}
          <GGInput
            islogin={true}
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          <Spacer y={2} />

          <Button
            className="w-full"
            color="primary"
            type="submit"
            variant="shadow"
          >
            Register
          </Button>
        </GGForm>
      </div>
    </GGModal>
  );
};

export default RegisterModal;
