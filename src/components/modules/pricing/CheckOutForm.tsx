import { Button } from "@nextui-org/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import {
  useCretePaymentIntentMutations,
  useUpdateUserPlaneMutations,
} from "@/src/hook/price.hook";
import { useUser } from "@/src/context/useProviders";

interface IProps {
  price: number;
}

const CheckoutForm = ({ price }: IProps) => {
  const { user } = useUser();
  const [clientSecret, setClientSecret] = useState("");

  const {
    mutate: createPaymentIntent,
    data,
    isSuccess,
    isError,
  } = useCretePaymentIntentMutations();
  const { mutate: updateUserPlane } = useUpdateUserPlaneMutations(
    user?._id ? user?._id : ""
  );

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!clientSecret && !isSuccess && !isError) {
      createPaymentIntent(price);
    }

    if (isSuccess && data?.clientSecret) {
      setClientSecret(data.clientSecret);
    }
  }, [price, clientSecret, isSuccess, isError, data, createPaymentIntent]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const tostId = toast.loading(
      "Please wait a few seconds while we process your payment..."
    );

    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("[error]", error);

      return;
    }

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: `${user?.name}`,
        },
      },
    });

    if (paymentIntent?.status === "succeeded") {
      toast.success("Your payment was successful!", { id: tostId });
      updateUserPlane(user?._id ? user?._id : "");
    }
  };

  return (
    <form className=" border  border-gray-500  p-8" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "green",
              "::placeholder": {
                color: "",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button
        className="bg-green-500 text-white my-8 w-full "
        disabled={!stripe}
        type="submit"
      >
        Purchase
      </Button>
    </form>
  );
};

export default CheckoutForm;
