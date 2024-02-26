import React, { useId } from "react";

function Select({ options = [], className = "", name, ...props }, ref) {
  const id = useId();
  return (
    <div>
      <select name={name} id={id} className={className} {...props} ref={ref}>
        {options?.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
