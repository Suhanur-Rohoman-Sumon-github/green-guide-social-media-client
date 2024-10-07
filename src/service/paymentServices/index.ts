
import axiosInstance from "@/src/lib/AxiosInostance";

export const cretePaymentsIntent = async (price:number) => {
    console.log(price);
  try {
    const{ data} = await axiosInstance.post("/payments", { price });

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};