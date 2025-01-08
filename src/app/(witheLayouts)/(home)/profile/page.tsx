import React from "react";

import UserProfile from "@/src/components/modules/profile/UserProfile";
import SingleUserPosts from "@/src/components/modules/profile/SingleUserProfilePosts";

const page = () => {
  return (
    <div className="border  border-gray-500">
      <UserProfile isUserProfile={true} />
      <SingleUserPosts />
    </div>
  );
};

export default page;
