import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../common/helper";
import { useNavigate } from "react-router-dom";
import { Input, Button, Loader } from "../components";

function Login() {
  const { register, handleSubmit, formState } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginForm = async (data) => {
    setLoading(true);
    try {
      if (data) {
        let loginData = await axios.post(
          "http://localhost:6001/api/v1/auth/login",
          data
        );
        sessionStorage.setItem("userData", JSON.stringify(loginData.data.auth));
        showToast(
          "success",
          loginData.data ? loginData.data.message : "success"
        );
        navigate("/");
      }
    } catch (error) {
      showToast(
        "error",
        error.response ? error.response.data.message : "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-4">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        {loading && <Loader />}
        <div className="w-full text-center font-bold">Login</div>
        <form onSubmit={handleSubmit(loginForm)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email :-"
              placeholder="Enter your email"
              className="mb-4"
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

            <Input
              label="Password :-"
              placeholder="Enter your password"
              className="mb-4"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="flex justify-center">
              <Button type="submit" name="Login" className="mb-4" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
