import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../common/helper";
import { useNavigate } from "react-router-dom";
import { Button, Loader } from "../components";

function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    setLoading(true);
    try {
      if (data) {
        let signup = await axios.post(
          "http://localhost:6001/api/v1/auth/signup",
          data
        );
        setLoading(false);
        reset();
        showToast("success", signup.data ? signup.data.message : "success");
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      showToast(
        "error",
        error.response ? error.response.data.message : "Error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-4">
      {loading && <Loader />}
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="w-full text-center font-bold">Signup</div>
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <input
              placeholder="Enter your name"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              type="name"
              {...register("name", {
                required: true,
              })}
            />
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
            <input
              placeholder="Confirm password"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              type="password"
              {...register("conPassword", {
                required: true,
              })}
            />
            <div className="flex justify-center">
              <Button type="submit" name="Signup" className="mb-4" />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
