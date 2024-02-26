import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "./";
import authServices from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const loginUser = async (data) => {
    setError("");
    try {
      const loginUser = authServices.login(data);
      if (loginUser) {
        const userData = authServices.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(loginUser)}>
        <Input
          label="Email : "
          type="email"
          name="email"
          className="input"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
        <Input
          label="Password : "
          type="password"
          name="password"
          className="input"
          {...register("password", {
            required: true,
          })}
        />
        <Button name="Submit" type="submit" className="button" />
      </form>
    </div>
  );
}

export default Login;
