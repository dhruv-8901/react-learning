import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { axiosTemplate, showToast } from "../common/helper";
import { Loader } from "../components/Loader";

function Home() {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const sessionData = sessionStorage.getItem("userData");
  useEffect(() => {
    if (!sessionData) {
      navigate("/login");
    } else {
      setLoading(true);
      const userData = JSON.parse(sessionData);
      const axiosInstance = axiosTemplate(userData.accessToken);
      axiosInstance
        .get("blog")
        .then((response) => {
          const data = response.data.data;
          if (data && data.length) {
            setBlogs(response.data.data);
            console.log(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error making GET request:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 float-right mr-5">
        <button
          type="button"
          class="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => navigate("/blog/add")}
        >
          Add Blog
        </button>
      </div>
      <div className="flex items-center justify-center w-full mt-4">
        {loading && <Loader />}

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="mx-auto w-[300px] rounded-md border"
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
            <img
              src={blog.image}
              alt="Laptop"
              className="p-4 w-full rounded-t-md object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold">{blog.title}</h1>
              <p className="mt-3 text-sm text-gray-600">{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
