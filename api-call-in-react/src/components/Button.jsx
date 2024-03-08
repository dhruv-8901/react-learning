import React from "react";

const Button = React.forwardRef(function Button(
  { type, name, className, ...props },
  ref
) {
  return (
    <>
      <button
        type={type}
        className={`px-3 py-2 rounded-lg bg-black text-white ${className}`}
        {...props}
        ref={ref}
      >
        {name}
      </button>
    </>
  );
});

export default Button;
