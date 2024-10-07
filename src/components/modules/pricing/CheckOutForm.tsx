import { useCretePaymentIntentMutations } from "@/src/hook/price.hook";
import { Button } from "@nextui-org/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface IProps {
  price: number;
}

const CheckoutForm = ({ price }: IProps) => {
  console.log(price);
  const [clientSecret, setClientSecret] = useState("");

  const [isPaymentIntent, setIsPaymentIntent] = useState(false);
  const {
    mutate: createPaymentIntent,
    data,
    isSuccess,
    isError,
  } = useCretePaymentIntentMutations();
  console.log(data);

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
  console.log(clientSecret);

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
          name: "mr:sumon",
        },
      },
    });

    if (paymentIntent?.status === "succeeded") {
      toast.success("Your payment was successful!", { id: tostId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" border  p-8">
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
        type="submit"
        disabled={!stripe}
      >
        Purchase
      </Button>
    </form>
  );
};

export default CheckoutForm;
