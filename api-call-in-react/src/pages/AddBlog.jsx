import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { ToastContainer } from "react-toastify";
import { axiosTemplate, showToast } from "../common/helper";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BlogForm from "../components/BlogForm";

function AddBlog() {
  return (
    <>
      <BlogForm />
    </>
  );
}

export default AddBlog;
