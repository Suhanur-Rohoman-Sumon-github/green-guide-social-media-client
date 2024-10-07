import React from "react";

import MyPost from "@/src/components/modules/profile/MyPost";
import UserProfile from "@/src/components/modules/profile/UserProfile";

const page = () => {
  return (
    <div className="border">
      <UserProfile />
      <MyPost />
    </div>
  );
};

export default page;
