import React from "react";

const Input = React.forwardRef(function Input({ type, name }, ref) {
  return <input type={type} name={name} ref={ref} />;
});

export default Input;
