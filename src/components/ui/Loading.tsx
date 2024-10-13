import { Spinner } from "@nextui-org/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Spinner className="text-green-500" />
    </div>
  );
};

export default Loading;
