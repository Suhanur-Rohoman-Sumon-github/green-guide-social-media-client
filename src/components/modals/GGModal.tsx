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
          className="w-9/12"
          color="primary"
          variant="bordered"
          onPress={handleOpen}
        >
          {buttonText}
        </Button>
      )}
      {isUserProfile && (
        <Button
          className="bg-green-500 text-white"
          variant="shadow"
          onPress={handleOpen}
        >
          {buttonText}
        </Button>
      )}

      {isComment && (
        <button className="cursor-pointer" onClick={handleOpen}>
          {buttonText}
        </button>
      )}

      {isProfile && (
        <button className="cursor-pointer" onClick={handleOpen}>
          {buttonText}
        </button>
      )}

      {isPoll && (
        <button className="cursor-pointer" onClick={handleOpen}>
          {buttonText}
        </button>
      )}

      <Modal isOpen={isOpen} size={sizes} onOpenChange={handleClose}>
        <ModalContent>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GGModal;
