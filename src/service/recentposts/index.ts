
import envConfig from "@/src/config/envConfig";

const fetchOptions = {
  next: {
    tags: ["posts"],
  },
};

export const getRecentPosts = async () => {
  const res = await fetch(`${envConfig.baseApi}/posts`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};