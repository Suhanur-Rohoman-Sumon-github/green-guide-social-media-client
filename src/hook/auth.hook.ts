import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { loginUser, registerUser } from "../service/authServices";
import {
  ForgetPasswordServices,
  resetPasswordService,
} from "../service/userservices";

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

// Assuming you have this service function

export const usePasswordResetMutations = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["password reset"],
    mutationFn: async (userData) => {
      const { email, newPassword, token } = userData;

      console.log(email, newPassword, token);
      await resetPasswordService(email, newPassword, token);
    },
    onSuccess: () => {
      toast.success(
        "Password reset successfully. You can now login with your new password.",
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useForgetPasswordMutations = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["forget password"],
    mutationFn: async (email) => {
    
      await ForgetPasswordServices(email);
    },
    onSuccess: () => {
      toast.success(
        "Email send successfully. ",
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
