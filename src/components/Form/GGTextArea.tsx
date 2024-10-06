import { Textarea } from "@nextui-org/input";
import React from "react";

const GGTextArea = ({ label, placeholder }) => {
  return (
    <Textarea
      label="Description"
      placeholder="Enter your description"
      className="max-w-xs"
    />
  );
};

export default GGTextArea;
