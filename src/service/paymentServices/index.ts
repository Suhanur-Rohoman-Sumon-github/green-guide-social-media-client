import axiosInstance from "@/src/lib/AxiosInostance";

export const cretePaymentsIntent = async (price: number) => {
  console.log(price);
  try {
    const { data } = await axiosInstance.post("/payments", { price });

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const updateUserPlane = async (userId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/payments/update-user-plane/${userId}`,
    );

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
