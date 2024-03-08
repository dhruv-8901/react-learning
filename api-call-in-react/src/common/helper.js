import axios from "axios";
import { toast } from "sonner";

export const showToast = (type, message) => {
  if (type == "success") {
    toast.success(message ? message : "Success", {
      position: "top-right",
      duration: 2000,
      invert: true,
    });
  } else {
    toast.error(message ? message : "Error", {
      position: "top-right",
      duration: 2000,
      invert: true,
    });
  }
};

/**
 * Acios dynamic template
 * @param {*} accessToken
 * @returns
 */
export const axiosTemplate = (accessToken, contentType) => {
  const apiEndpoint =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api/v1/";

  const axiosInstance = axios.create({
    baseURL: apiEndpoint,
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": contentType ? contentType : "application/json",
    },
  });

  return axiosInstance;
};
