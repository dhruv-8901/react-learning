import React from "react";

function Button({ label, type, className = "", ...props }) {
  return (
    <>
      <button type={type} className={`p-2 ${className}`} {...props}>
        {label}
      </button>
    </>
  );
}

export default Button;
