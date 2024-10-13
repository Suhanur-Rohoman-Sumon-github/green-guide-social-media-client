import React from "react";

import MyPost from "@/src/components/modules/profile/MyPost";
import UserProfile from "@/src/components/modules/profile/UserProfile";
interface Params {
  userId: string;
}

const SingleUserProfile = ({ params }: { params: Params }) => {
  return (
    <div className="border">
      <UserProfile UserId={params.userId} isUserProfile={false} />
      <MyPost UserId={params.userId} isUserProfile={false} />
    </div>
  );
};

export default SingleUserProfile;
