import { useFormContext } from "react-hook-form";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

export default function GGselect({
  options,
  name,
  label,
  variant = "border  border-gray-500ed",
  disabled,
}: IProps) {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      size="sm"
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      isDisabled={disabled}
      label={label}
      variant={"flat"}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
