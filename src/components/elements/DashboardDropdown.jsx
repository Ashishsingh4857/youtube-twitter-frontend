import React from "react";
import ClickAwayListener from "react-click-away-listener";

const DashboardDropdown = ({
  isOpen,
  onClose,
  children,
  className,
  position = "right",
}) => {
  return (
    <>
      {isOpen && (
        <ClickAwayListener onClickAway={onClose}>
          <div
            className={`absolute bg-gray-800 border border-gray-700 rounded-md p-2 z-10 ${
              position === "right" ? "right-0" : "left-0"
            } ${className}`}
          >
            {children}
          </div>
        </ClickAwayListener>
      )}
    </>
  );
};

export default DashboardDropdown;
