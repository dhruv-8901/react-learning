import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const  setUser  = useContext(UserContext);

  console.log(setUser);

  const handleSubmit = (e) => {
    setUser({ username, password });
  };

  return (
    <>
      <h1>Login Form</h1>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default Login;
