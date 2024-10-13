import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  username?: string; // Use this if you prefer "username"
  role: string;
  email: string;
  status: string;
  mobileNumber?: string;
  profilePicture: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  currentState?: string; // Remove userName property if keeping username
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

export interface IComment {
  user: IUser;
  content: string;
  createdAt?: Date;
}

export interface IPost {
  _id: string;
  user: IUser;
  content: string;
  imageUrls?: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  postType: string;
  category: string;
}

export type FriendsProps = {
  friends: {
    sender: string;
    receiver: string;
  };
};

export type FriendRequest = {
  createdAt: string;
  receiver: string;
  sender: IUser;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
