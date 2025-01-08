import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  type?: string;
  descriptions?: string; // Keep this to pass the description
}

export default function GGTextArea({
  name,
  label,
  variant = "border  border-gray-500ed",
  descriptions,
}: IProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  // Update the value when descriptions change
  useEffect(() => {
    if (descriptions !== undefined) {
      setValue(name, descriptions);
    }
  }, [descriptions, name, setValue]);

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      value={currentValue || descriptions || ""}
      variant={variant}
    />
  );
}
