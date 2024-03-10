import { useField } from "formik";
import React from "react";

const CustomInput = ({ label, placeHolder, className, type, ...props }) => {
  const [field, meta] = useField(props);
  console.log({ field, meta });
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <input
        placeholder={placeHolder}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        type={type}
        {...props}
        {...field}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomInput;
