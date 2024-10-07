import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  cretePaymentsIntent,
  updateUserPlane,
} from "../service/paymentServices";

export const useCretePaymentIntentMutations = () => {
  return useMutation<any, Error, number>({
    mutationKey: ["create payment intent"],
    mutationFn: async (price) => {
      return await cretePaymentsIntent(price);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(error.message);
      console.error("Error creating payment intent:", error);
    },
  });
};
export const useUpdateUserPlaneMutations = (userId: string) => {
  return useMutation<any, Error, string>({
    mutationKey: ["create payment intent"],
    mutationFn: async () => {
      return await updateUserPlane(userId);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(error.message);
      console.error("Error creating payment intent:", error);
    },
  });
};
