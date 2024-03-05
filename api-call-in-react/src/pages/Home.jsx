import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function Home() {
  const authData = useSelector((state) => state.auth);

  const apiEndpoint = "http://localhost:6001/api/v1/";
  const accessToken = authData.accessToken;

  console.log(authData);

  const axiosInstance = axios.create({
    baseURL: apiEndpoint,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json", // Adjust content type as needed
    },
  });

  axiosInstance
    .get("blog")
    .then((response) => {
      // Handle the response data here
      console.log(response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error making GET request:", error);
    });

  return (
    <div className="flex items-center justify-center w-full mt-4">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      ></div>
      <ToastContainer />
    </div>
  );
}

export default Home;
