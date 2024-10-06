import React, { useEffect, useState } from "react";
import GGModal from "./GGModal";
import GGForm from "../Form/GGForm";
import { useUserRegistretion } from "@/src/hook/auth.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spacer } from "@nextui-org/spacer";
import GGInput from "../Form/GGInput";
import { Button } from "@nextui-org/button";
import { registerValidationSchema } from "@/src/schema/registerValidationschema";
import Loading from "../ui/Loading";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const {
    mutate: handleUserRegistretion,
    isPending,
    isSuccess,
  } = useUserRegistretion();

  const handleRegister = (data: any) => {
    console.log(data);
    const userData = {
      ...data,
    };
    console.log(userData);

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
      isProfile={false}
      buttonText={"create account"}
      sizes="2xl"
      isOpen={isOpen} // Pass isOpen state
      setIsOpen={setIsOpen} // Pass setIsOpen function
    >
      {isPending && <Loading />}
      <div className="p-8 rounded-lg">
        <GGForm
          onSubmit={handleRegister}
          resolver={zodResolver(registerValidationSchema)}
        >
          <h2 className="text-2xl font-semibold text-center">Register</h2>
          <Spacer y={1} />

          {/* Username Input */}
          <GGInput type="text" label="Username" name="username" />
          <Spacer y={1.5} />

          {/* Name Input */}
          <GGInput type="text" label="Name" name="name" />
          <Spacer y={1.5} />

          {/* Email Input */}
          <GGInput type="email" label="Email" name="email" />
          <Spacer y={1.5} />

          {/* Password Input */}
          <GGInput
            islogin={true}
            type="password"
            label="Password"
            name="password"
          />
          <Spacer y={1.5} />

          {/* Confirm Password Input */}
          <GGInput
            islogin={true}
            type="password"
            label="Confirm Password"
            name="confirmPassword"
          />
          <Spacer y={2} />

          <Button
            type="submit"
            color="primary"
            variant="shadow"
            className="w-full"
          >
            Register
          </Button>
        </GGForm>
      </div>
    </GGModal>
  );
};

export default RegisterModal;
