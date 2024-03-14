import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "../components";
import { axiosTemplate, showToast } from "../common/helper";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const sessionData = sessionStorage.getItem("userData");
  const [userProfile, setUserProfile] = useState();
  const [editMode, setEditMode] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const navigate = useNavigate();
  let userData;
  let axiosInstance;

  if (sessionData) {
    userData = JSON.parse(sessionData);
    axiosInstance = axiosTemplate(userData.accessToken);
  } else {
    navigate("/login");
  }

  const {
    handleSubmit,
    handleChange,
    submitForm,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: userProfile || {
      name: "",
      email: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      axiosInstance
        .put("user", values)
        .then((res) => {
          showToast("success", res.data.message);
          navigate("/");
        })
        .catch((error) => {
          showToast("error", error.response.data.message);
        });
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sessionData) {
          const profile = await axiosInstance.get("user");
          delete profile.data.data._id;
          setUserProfile(profile.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const submit = () => {
    if (!editMode) {
      return setEditMode(true);
    } else {
      submitForm();
    }
  };

  return values ? (
    <div className="flex items-center justify-center w-full mt-4">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="w-full text-center font-bold">Profile</div>
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <input
              type="name"
              autoComplete="off"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4"
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!editMode}
            />
            {/* <Input
              label="Name :"
              placeHolder="enter your name"
              className="mb-4"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!editMode}
            /> */}
            {errors && errors.name ? (
              <div className="mb-4 text-red-500">
                <p>{errors.name}</p>
              </div>
            ) : null}
            <input
              type="email"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4"
              autoComplete="off"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!editMode}
            />
            {/* <Input
              label="Email :"
              placeHolder="enter your email"
              className="mb-4"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!editMode}
            /> */}
            {errors && errors.email ? (
              <div className="mb-4 text-red-500">
                <p>{errors.email}</p>
              </div>
            ) : null}
            <div className="flex justify-center">
              <Button
                type="button"
                name={editMode ? "update" : "Edit"}
                className="mt-6 mb-4 !px-10"
                onClick={submit}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default EditProfile;
