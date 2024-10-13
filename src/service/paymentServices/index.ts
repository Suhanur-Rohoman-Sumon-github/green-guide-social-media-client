import axios from "axios";

// Create Payments Intent function
export const createPaymentsIntent = async (price: number) => {
  try {
    const { data } = await axios.post(
      "https://green-guide-server.vercel.app/api/v1/payments",
      { price }, // Pass price as the request body
    );

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Update User Plan function
export const updateUserPlane = async (userId: string) => {
  try {
    const { data } = await axios.patch(
      `https://green-guide-server.vercel.app/api/v1/payments/update-user-plane/${userId}`,
    );

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
