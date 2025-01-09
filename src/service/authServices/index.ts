"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/AxiosInostance";
import axios from "axios";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axios.post(
      "https://express-server-startar-pack-main.vercel.app/api/v1/auth/register",
      userData,
    );

    if (data.success) {
      cookies().set("accessToken", data.data.accessToken);
      cookies().set("refreshToken", data.data.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data.data.accessToken);
      cookies().set("refreshToken", data.data.refreshToken);
    }

    return data;
  } catch (error: any) {
    
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken?._id,
      name: decodedToken?.name,
      username: decodedToken?.username,
      email: decodedToken?.email,

      role: decodedToken?.role,
      status: decodedToken?.status,
      profilePicture: decodedToken?.profilePicture,
    };
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    
    throw new Error(error.response?.data?.message || error.message);
  }
};
