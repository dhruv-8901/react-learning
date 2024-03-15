import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosTemplate } from "../common/helper";
import { Loader } from "../components";
import moment from "moment";
import logo from "../assets/logo.png";
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
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 401) {
            sessionStorage.clear();
            navigate("/login");
          }
          console.error("Error making GET request:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const convertDate = (date) => {
    return moment(date).format("MMMM DD, YYYY");
  };

  return (
    <>
      {loading && <Loader />}
      <div class="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 relative">
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {blogs.map((blog) => (
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
                <a
                  className="relative block aspect-square"
                  href="post/architectural-engineering-wonders-of-the-modern-era-for-your-inspiration.html"
                >
                  <img
                    alt="Thumbnail"
                    loading="lazy"
                    decoding="async"
                    data-nimg="fill"
                    className="object-cover transition-all"
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      color: "transparent",
                    }}
                    sizes="(max-width: 768px) 30vw, 33vw"
                    src={blog.image}
                    onError={(e) => (e.currentTarget.src = logo)}
                  />
                </a>
              </div>
              <div className="">
                <div>
                  <div className="flex gap-3">
                    <a href="category/technology.html">
                      <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-blue-600">
                        Technology
                      </span>
                    </a>
                  </div>
                  <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 dark:text-white">
                    <a href="post/architectural-engineering-wonders-of-the-modern-era-for-your-inspiration.html">
                      <span className="bg-gradient-to-r from-orange-200 to-orange-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                        {blog.title}
                      </span>
                    </a>
                  </h2>
                  <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                    <a href="author/mario-sanchez.html">
                      <div className="flex items-center gap-3">
                        <div className="relative h-5 w-5 flex-shrink-0">
                          <img
                            alt="Mario Sanchez"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="rounded-full object-cover"
                            style={{
                              position: "absolute",
                              height: "100%",
                              width: "100%",
                              left: 0,
                              top: 0,
                              right: 0,
                              bottom: 0,
                              color: "transparent",
                            }}
                            sizes="20px"
                            src={blog.image}
                          />
                        </div>
                        <span className="truncate text-sm">Mario Sanchez</span>
                      </div>
                    </a>
                    <span className="text-xs text-gray-300 dark:text-gray-600">
                      •
                    </span>
                    <time
                      className="truncate text-sm"
                      dateTime="2022-10-21T15:48:00.000Z"
                    >
                      {convertDate(blog.blogPostedAt)}
                    </time>
                  </div>
                </div>
              </div>
            </div>

            // <div
            //   key={blog._id}
            //   className="mx-auto w-[300px] rounded-md border"
            //   onClick={() => navigate(`/blog/${blog._id}`)}
            // >
            //   <img
            //     src={blog.image}
            //     alt="Laptop"
            //     className="p-4 w-full rounded-t-md object-cover"
            //   />
            //   <div className="p-4">
            //     <h1 className="text-lg font-semibold">{blog.title}</h1>
            //     <p className="mt-3 text-sm text-gray-600">{blog.content}</p>
            //   </div>
            // </div>
          ))}
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 float-center mr-5">
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => navigate("/blog/add")}
            >
              Add Blog
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
