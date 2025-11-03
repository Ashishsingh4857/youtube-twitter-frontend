import React from "react";

function Container({ children, className, ...props }) {
  return (
    <div
      className={` grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
