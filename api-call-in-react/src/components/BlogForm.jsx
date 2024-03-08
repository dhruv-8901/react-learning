import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { axiosTemplate, showToast } from "../common/helper";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function BlogForm({ post }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });
  const [selectedImage, setSelectedImage] = useState(post ? post.image : null);
  const sessionData = sessionStorage.getItem("userData");
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const submit = (data) => {
    const userData = JSON.parse(sessionData);
    if (userData && data) {
      const axiosInstance = axiosTemplate(
        userData.accessToken,
        "multipart/form-data"
      );
      if (data.image && data.image.length) {
        data.image = data.image[0];
      }
      console.log(data);
      if (post) {
        axiosInstance
          .put(`blog/${post._id}`, data)
          .then((res) => {
            showToast("success", res.data.message);
            navigate("/");
          })
          .catch((error) => {
            showToast("error", error.response.data.message);
          });
      } else {
        axiosInstance
          .post(`blog`, data)
          .then((res) => {
            showToast("success", res.data.message);
            navigate("/");
          })
          .catch((error) => {
            showToast("error", error.response.data.message);
          });
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-4">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="w-full text-center font-bold">Login</div>
        <form onSubmit={handleSubmit(submit)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Title :-"
              placeHolder="Enter blog title"
              className="mb-4"
              type="text"
              {...register("title", {
                required: !post,
              })}
            />
            <Input
              label="content :-"
              placeHolder="Enter blog content"
              className="mb-4"
              type="text"
              {...register("content", {
                required: !post,
              })}
            />
            {selectedImage && (
              <div className="mt-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
            <Input
              label="image :-"
              placeHolder=""
              className="mb-4"
              type="file"
              {...register("image", {
                required: !post,
              })}
              onChange={handleImageChange}
            />
            <div className="flex justify-center">
              <Button
                type="submit"
                name={post ? "Update Blog" : "Add Blog"}
                className="mb-4"
              />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BlogForm;
