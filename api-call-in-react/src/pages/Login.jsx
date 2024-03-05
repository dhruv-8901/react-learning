import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../common/helper";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Login() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginForm = async (data) => {
    setLoading(true);
    try {
      if (data) {
        let loginData = await axios.post(
          "http://localhost:6001/api/v1/auth/login",
          data
        );
        setLoading(false);
        dispatch(login(loginData.data.auth));
        showToast(
          "success",
          loginData.data ? loginData.data.message : "success"
        );
      }
    } catch (error) {
      setLoading(false);
      showToast(
        "error",
        error.response ? error.response.data.message : "Error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-4">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="w-full text-center font-bold">Login</div>
        <form onSubmit={handleSubmit(loginForm)} className="mt-8">
          <div className="space-y-5">
            <input
              placeholder="Enter your email"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <input
              placeholder="Enter your password"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-black text-white"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
