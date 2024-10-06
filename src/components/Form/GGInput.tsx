import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";
// Assuming you are importing these icons
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

interface IProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type: string;
  label: string;
  name: string;
  islogin?: boolean;
  fullWidth?: boolean;
}

const GGInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  islogin = false,
  fullWidth = false,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message?.toString() || "";
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className={`w-full ${fullWidth ? "w-full" : ""}`}>
      {" "}
      {!islogin && (
        <Input
          {...register(name)}
          errorMessage={errorMessage}
          isInvalid={!!errors[name]}
          variant={variant}
          size={size}
          required={required}
          type={type}
          label={label}
          className="w-full"
        />
      )}
      {islogin && (
        <Input
          variant={variant}
          size={size}
          required={required}
          label={label}
          placeholder="Enter your password"
          {...register(name)}
          errorMessage={errorMessage}
          isInvalid={!!errors[name]}
          className={`w-full ${fullWidth ? "w-full" : ""}`}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <GoEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <GoEyeClosed className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
      )}
    </div>
  );
};

export default GGInput;
