import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CustomInput, Button } from "../components";

function Test() {
  const initialValues = {
    name: "",
    email: "",
    address: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("title is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
  });

  const submit = (data) => {
    console.log(data);
  };

  return (
    <div
      className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
    >
      <h1>My Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {(props) => (
          <Form>
            <CustomInput
              label="Title :"
              placeHolder="enter your title"
              className="mb-4"
              type="text"
              name="title"
            />
            <Field
              name="name"
              type="text"
              placeholder="Enter your name"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4"
            />
            <br />
            <ErrorMessage name="name" />
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4"
            />
            <br />
            <ErrorMessage name="email" cl />
            <Field
              name="address"
              type="text"
              placeholder="Enter your address"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4"
            />
            <br />
            <ErrorMessage name="address" />
            <br />
            <Button type="submit" name="submit" className="mb-4" />
          </Form>
        )}
      </Formik>
    </div>
  );

  //   return (
  //     <div
  //       className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
  //     >
  //       <Formik
  //         initialValues={initialValues}
  //         validationSchema={validationSchema}
  //         onSubmit={submit}
  //       >
  //   <Form>
  //     <CustomInput
  //       label="Title :"
  //       placeHolder="enter your title"
  //       className="mb-4"
  //       type="text"
  //       name="title"
  //     />
  //     <ErrorMessage name="title" />
  //     <Field
  //       name="name"
  //       type="text"
  //       placeholder="Enter your name"
  //       className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4"
  //     />
  //     <br />
  //     <ErrorMessage name="name" />
  //     <Field
  //       name="email"
  //       type="email"
  //       placeholder="Enter your email"
  //       className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4"
  //     />
  //     <br />
  //     <ErrorMessage name="email" cl />
  //     <Field
  //       name="address"
  //       type="text"
  //       placeholder="Enter your address"
  //       className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4"
  //     />
  //     <br />
  //     <ErrorMessage name="address" />
  //     <br />
  //     <Button type="submit" name="submit" className="mb-4" />
  //   </Form>
  //       </Formik>
  //     </div>
  //   );
}

export default Test;
