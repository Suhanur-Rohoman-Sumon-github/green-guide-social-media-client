import Image from "next/image";
import React from "react";

const SmallScreenProfile = () => {
  return (
    <div className="flex items-center ">
      <div>
        <Image
          alt={"sumon"}
          className="rounded-full"
          height={20}
          src="https://i.ibb.co/3Mrx6Fg/blank-profile.webp"
          width={20}
        />
      </div>
    </div>
  );
};

export default SmallScreenProfile;
