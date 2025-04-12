"use client";
import { cn } from "@/app/lib/utils";
import { title } from "process";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../Button";

interface ModalProps {
  isOpen: boolean;
  disabled: boolean;
  onClose: () => {};
  onSubmit: () => {};
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  disabled = false,
  onClose,
  onSubmit,
  title,
  children,
  footer,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <>
      <div className="Modal grid place-items-center inset-0 bg-neutral-800/70 fixed z-50">
        <div className="relative w-full h-full md:h-4/6 lg:w-3/6">
          {/* Content */}
          <div
            className={cn(
              "translate duration-300 h-full translate-y-full opacity-0",
              {
                "translate-y-0 opacity-100": showModal,
              }
            )}
          >
            <div className="translate flex flex-col rounded-lg h-full sm:h-auto  border-0 bg-white">
              <div className="Header flex items-center justify-between p-6">
                <label htmlFor="Header" className="text-lg">
                  {title}
                </label>
                <button onClick={handleClose}>
                  <IoMdClose size={18} />
                </button>
              </div>
              <div className="Body relative p-6 grow">{children}</div>
              <div className="Footer grid gap-4 p-6 ">{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
