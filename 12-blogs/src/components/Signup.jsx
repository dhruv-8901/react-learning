import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button, Logo } from "./";
import authServices from "../appwrite/auth";
import { login } from "../store/authSlice";

function Signup() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const createAccount = await authServices.createAccount(data);
      if (createAccount) {
        dispatch(login(createAccount));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form action="post" onSubmit={handleSubmit(create)}>
        <Input
          label="Name : "
          type="text"
          name="name"
          {...register("name", {
            required: true,
          })}
        />
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
        <Button name="signup" type="submit" />
      </form>
    </div>
  );
}

export default Signup;
