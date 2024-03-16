import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosTemplate } from "../common/helper";
import { Input, Loader } from "../components";
import moment from "moment";
import logo from "../assets/logo.png";
function Home() {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState(null);
  const [searchNow, setSearchNow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const navigate = useNavigate();
  const sessionData = sessionStorage.getItem("userData");
  useEffect(() => {
    if (!sessionData) {
      navigate("/login");
    } else {
      setLoading(true);
      setBlogs([]);
      const userData = JSON.parse(sessionData);
      const axiosInstance = axiosTemplate(userData.accessToken);
      axiosInstance
        .get("blog", {
          params: {
            search,
            page: currentPage,
          },
        })
        .then((response) => {
          setLastPage(response.data.meta.lastPage);
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
          setSearchNow(false);
        });
    }
  }, [currentPage, searchNow]);

  const convertDate = (date) => {
    return moment(date).format("MMMM DD, YYYY");
  };

  console.log({ currentPage, lastPage, search });

  return (
    <>
      {loading && <Loader />}
      <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Input
              label=""
              placeholder="search"
              className="!w-48"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ml-4"
              onClick={() => {
                setSearchNow(true), setCurrentPage(1), setLastPage(null);
              }}
            >
              Search
            </button>
          </div>
          <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => navigate("/blog/add")}
          >
            Add Blog
          </button>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {blogs.map((blog) => (
            <div className="group cursor-pointer" key={blog._id}>
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
          ))}
        </div>
        <div className="flex justify-center items-center mt-6 mb-4">
          <button
            type="button"
            className="rounded-md border border-black px-7 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-20 mt-10"
            disabled={currentPage == 1 ? true : false}
            onClick={() =>
              setCurrentPage((value) => (value > 1 ? value - 1 : value))
            }
          >
            <span className={currentPage == 1 ? `blur-[1px]` : ""}>Prev</span>
          </button>
          <button
            type="button"
            className="rounded-md border border-black px-7  py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mt-10"
            disabled={
              (lastPage && (currentPage == lastPage) == 1) || lastPage == 0
                ? true
                : false
            }
            onClick={() => setCurrentPage((value) => value + 1)}
          >
            <span
              className={
                (lastPage && (currentPage == lastPage) == 1) || lastPage == 0
                  ? `blur-[1px]`
                  : ""
              }
            >
              Next
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
