import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authenticate = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authenticate && authStatus !== authenticate) {
      navigate("/login");
    } else if (!authenticate && authStatus !== authenticate) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authenticate, navigate]);

  return loader ? <div>.....Loading</div> : <>{children}</>;
}

export default AuthLayout;
