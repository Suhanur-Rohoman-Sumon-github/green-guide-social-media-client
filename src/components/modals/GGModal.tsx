import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent } from "@nextui-org/modal";
import React, { ReactNode } from "react";

interface TProps {
  children: ReactNode;
  buttonText: ReactNode | string;
  isComment?: boolean;
  sizes:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  setIsOpen?: (open: boolean) => void;
  isOpen?: boolean;
  isProfile?: boolean;
  isUserProfile?: boolean;
  isPoll?: boolean;
}

const GGModal = ({
  children,
  buttonText,
  isComment,
  sizes,
  setIsOpen,
  isOpen,
  isProfile,
  isUserProfile,
  isPoll,
}: TProps) => {
  const handleOpen = () => {
    if (setIsOpen) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {!isComment && !isProfile && !isUserProfile && !isPoll && (
        <Button
          color="primary"
          variant="bordered"
          className="w-9/12"
          onPress={handleOpen}
        >
          {buttonText}
        </Button>
      )}
      {isUserProfile && (
        <Button
          variant="shadow"
          className="bg-green-500 text-white"
          onPress={handleOpen}
        >
          {buttonText}
        </Button>
      )}

      {isComment && (
        <h1 onClick={handleOpen} className="cursor-pointer">
          {buttonText}
        </h1>
      )}

      {isProfile && (
        <h1 onClick={handleOpen} className="cursor-pointer">
          {buttonText}
        </h1>
      )}
      {isPoll && (
        <h1 onClick={handleOpen} className="cursor-pointer">
          {buttonText}
        </h1>
      )}

      <Modal size={sizes} isOpen={isOpen} onOpenChange={handleClose}>
        <ModalContent>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GGModal;
