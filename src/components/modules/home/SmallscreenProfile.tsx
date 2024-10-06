import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import React from "react";

const SmallScreenProfile = () => {
  return (
    <div className="flex items-center ">
      <div>
        <Image
          className="rounded-full"
          height={20}
          width={20}
          alt={"sumon"}
          src="https://i.ibb.co/3Mrx6Fg/blank-profile.webp"
        />
      </div>
    </div>
  );
};

export default SmallScreenProfile;
