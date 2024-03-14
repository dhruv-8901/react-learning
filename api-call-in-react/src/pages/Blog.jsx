import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosTemplate, showToast } from "../common/helper";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button } from "../components";

function Blog() {
  const { blogId } = useParams();
  const sessionData = sessionStorage.getItem("userData");
  const userData = JSON.parse(sessionData);
  const axiosInstance = axiosTemplate(userData.accessToken);
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const deleteAlert = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axiosInstance
              .delete(`blog/${blogId}`)
              .then((res) => {
                showToast("success", res.data.message);
                navigate("/");
              })
              .catch((error) => {
                showToast("error", error.response.data.message);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  useEffect(() => {
    if (blogId) {
      axiosInstance
        .get(`blog/${blogId}`)
        .then((response) => {
          setBlog(response.data.data);
        })
        .catch((error) => {
          showToast("error", error.response.data.message);
        });
    }
  }, [blogId]);

  return (
    <>
      <div className="flex items-center justify-center w-full mt-4">
        {blog && (
          <div key={blog._id} className="mx-auto w-[300px] rounded-md border">
            <img
              src={blog.image}
              alt="Laptop"
              className="p-4 w-full rounded-t-md object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold">{blog.name}</h1>
              <h6 className="mt-3 font-medium">Founder and CEO, DevUI</h6>
              <p className="mt-3 text-sm text-gray-600">{blog.content}</p>
            </div>
            {blog.isAuthor && (
              <div className="flex justify-between">
                <Button
                  type="button"
                  name="Edit"
                  className="mb-4 ml-4 !px-7"
                  onClick={() => navigate(`/blog/update/${blog._id}`)}
                />
                <Button
                  type="button"
                  name="Delete"
                  className="mb-4 mr-4 !px-6"
                  onClick={deleteAlert}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Blog;
