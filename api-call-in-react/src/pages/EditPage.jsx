import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosTemplate, showToast } from "../common/helper";
import { BlogForm } from "../components";

function EditPage() {
  const { blogId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const sessionData = sessionStorage.getItem("userData");

  useEffect(() => {
    if (blogId) {
      const userData = JSON.parse(sessionData);
      const axiosInstance = axiosTemplate(userData.accessToken);
      axiosInstance
        .get(`blog/${blogId}`)
        .then((res) => {
          if (!res.data) {
            showToast("success", "Blog not found");
            navigate("/");
          }
          setPost(res.data.data);
        })
        .catch((error) => {
          showToast("error", error.response.data.message);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [blogId, navigate]);

  return post ? <BlogForm post={post} /> : null;
}

export default EditPage;
