import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { axiosTemplate, showToast } from "../common/helper";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

function BlogForm({ post }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });
  const [selectedImage, setSelectedImage] = useState(post ? post.image : null);
  const sessionData = sessionStorage.getItem("userData");
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    trigger("image");
  };

  useEffect(() => {
    if (post) {
      setSelectedImage(post.image);
    }
  }, [post]);

  const submit = (data) => {
    try {
      setLoading(true);
      const userData = JSON.parse(sessionData);
      if (userData && data) {
        const axiosInstance = axiosTemplate(
          userData.accessToken,
          "multipart/form-data"
        );
        if (data.image && data.image.length) {
          data.image = data.image[0];
        }
        if (post) {
          axiosInstance
            .put(`blog/${post._id}`, data)
            .then((res) => {
              showToast("success", res.data.message);
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
              showToast("error", error.response && error.response.data.message);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          axiosInstance
            .post(`blog`, data)
            .then((res) => {
              showToast("success", res.data.message);
              navigate("/");
            })
            .catch((error) => {
              showToast("error", error.response && error.response.data.message);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }
    } catch (error) {
      showToast("error");
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-4">
      {loading && <Loader />}
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="w-full text-center font-bold">
          {post ? "Edit Blog" : "Add Blog"}
        </div>
        <form onSubmit={handleSubmit(submit)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Title :-"
              placeHolder="Enter blog title"
              className=""
              type="text"
              {...register("title", {
                // required: !post ? "Title is required" : false,
                required: "Title is required",
              })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
            <Input
              label="content :-"
              placeHolder="Enter blog content"
              className=""
              type="text"
              {...register("content", {
                // required: !post ? "Content is required" : false,
                required: "Content is required",
              })}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
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
              className=""
              type="file"
              {...register("image", {
                required: !post ? "Image is reuired" : false,
              })}
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
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
    </div>
  );
}

export default BlogForm;
