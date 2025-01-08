import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";
// Assuming you are importing these icons
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

interface IProps {
  variant?: "flat" | "border  border-gray-500ed" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type: string;
  label: string;
  name: string;
  islogin?: boolean;
  fullWidth?: boolean;
}

const GGInput = ({
  variant = "border  border-gray-500ed",
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
          className="w-full"
          errorMessage={errorMessage}
          isInvalid={!!errors[name]}
          label={label}
          required={required}
          size={size}
          type={type}
          variant={variant}
        />
      )}
      {islogin && (
        <Input
          label={label}
          placeholder="Enter your password"
          required={required}
          size={size}
          variant={variant}
          {...register(name)}
          className={`w-full ${fullWidth ? "w-full" : ""}`}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <GoEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <GoEyeClosed className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          errorMessage={errorMessage}
          isInvalid={!!errors[name]}
          type={isVisible ? "text" : "password"}
        />
      )}
    </div>
  );
};

export default GGInput;
