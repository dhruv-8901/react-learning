import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { axiosTemplate, showToast } from "../common/helper";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import logo from "../../public/logo.png";

function Header() {
  const navigate = useNavigate();
  const logoutAlert = () => {
    const sessionData = sessionStorage.getItem("userData");
    const userData = JSON.parse(sessionData);
    const axiosInstance = axiosTemplate(userData.accessToken);
    if (sessionData) {
      confirmAlert({
        title: "Confirm to logout",
        message: "Are you sure you want to logout.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              axiosInstance
                .post(`auth/logout`)
                .then((res) => {
                  showToast("success", res.data.message);
                  sessionStorage.clear();
                  navigate("/login");
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
    } else {
      showToast("error", "Login first!");
    }
  };

  return (
    <>
      <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
        <nav>
          <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
            <div class="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
              <div className="flex items-center">
                <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                  <li className="px-5">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `block py-2 ${
                          isActive ? "text-orange-700" : "text-gray-700"
                        } pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  text-base`
                      }
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="px-5">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `block py-2 ${
                          isActive ? "text-orange-700" : "text-gray-700"
                        } pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  text-base`
                      }
                      aria-current="page"
                    >
                      Profile
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex w-full items-center justify-between md:w-auto px-5">
              <a className="w-28 dark:hidden ">
                <img
                  alt="Logo"
                  fetchpriority="high"
                  width={132}
                  height={52}
                  decoding="async"
                  data-nimg={1}
                  style={{ color: "transparent" }}
                  sizes="(max-width: 640px) 100vw, 200px"
                  src={logo}
                />
              </a>
            </div>
            <div class="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
              <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li className="px-5">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block py-2 ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  text-base`
                    }
                    aria-current="page"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="px-5">
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `block py-2 ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 text-base`
                    }
                    aria-current="page"
                  >
                    Signup
                  </NavLink>
                </li>
                <div className="flex justify-end">
                  <li className="px-5">
                    <NavLink
                      onClick={logoutAlert}
                      className="block py-2 text-gray-700
                         pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 text-base"
                      aria-current="page"
                    >
                      Logout
                    </NavLink>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
