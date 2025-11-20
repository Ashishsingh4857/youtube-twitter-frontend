import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ConfirmationPopup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-950 bg-opacity-50 flex items-center justify-center z-10">
      <div className="pointer-events-auto bg-gray-800 border border-gray-700 rounded-md p-4 w-96 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <AiOutlineClose
            size={20}
            className="cursor-pointer text-white hover:text-gray-500"
            onClick={onClose}
          />
        </div>
        <p className="mb-4 text-white">{message}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md mr-2 text-white cursor-pointer"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md text-white cursor-pointer"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
