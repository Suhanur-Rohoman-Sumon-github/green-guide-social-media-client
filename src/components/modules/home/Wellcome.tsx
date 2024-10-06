import React from "react";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
const Wellcome = () => {
  return (
    <div className="flex px-3 my-3 gap-3 justify-center items-center">
      <h1 className="text-center text-3xl">Whats Happening</h1>
      <BsEmojiSmileUpsideDown className="text-pink-600 font-semibold" />
    </div>
  );
};

export default Wellcome;
