import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { loginUser, registerUser } from "../service/authServices";

export const useUserRegistretion = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user registration"],
    mutationFn: async (userData) => {
      await registerUser(userData);
    },
    onSuccess: () => {
      toast.success("user  created successfully please login now");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user login"],
    mutationFn: async (userData) => {
      await loginUser(userData);
    },
    onSuccess: () => {
      toast.success("user logged in  successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
