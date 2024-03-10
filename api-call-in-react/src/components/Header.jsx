import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { axiosTemplate, showToast } from "../common/helper";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

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
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  aria-current="page"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  aria-current="page"
                >
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  aria-current="page"
                >
                  Profile
                </NavLink>
              </li>
              <div className="flex justify-end">
                <li>
                  <Button
                    type="button"
                    name="logout"
                    className="mr-6"
                    onClick={logoutAlert}
                  />
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
