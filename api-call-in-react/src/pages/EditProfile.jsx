import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import Input from "../components/Input";
import Button from "../components/Button";
import { axiosTemplate } from "../common/helper";

function EditProfile() {
  const sessionData = sessionStorage.getItem("userData");
  const [userProfile, setUserProfile] = useState();
  const [values, setValues] = useState({});
  const [editMode, setEditMode] = useState(false);

  const {
    handleSubmit,
    handleChange,
    submitForm,
    setValues: setFormikValues,
  } = useFormik({
    initialValues: values,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sessionData) {
          const userData = JSON.parse(sessionData);
          const axiosInstance = axiosTemplate(userData.accessToken);
          const profile = await axiosInstance.get("user");
          setUserProfile(profile.data.data);
          setValues(profile.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setValues(values); // Update Formik values when values change
  }, [values, setFormikValues]);

  const submit = () => {
    if (!editMode) {
      return setEditMode(true);
    } else {
      submitForm();
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-4">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="w-full text-center font-bold">Profile</div>
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <Input
              label="Name :"
              placeHolder="enter your name"
              className="mb-4"
              type="text"
              value={values.name}
              onChange={handleChange}
              setValues={setValues}
              readOnly={!editMode}
            />
            <Input
              label="Email :"
              placeHolder="enter your email"
              className="mb-4"
              type="text"
              value={values.email}
              onChange={handleChange}
              setValues={setValues}
              readOnly={!editMode}
            />
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
  );
}

export default EditProfile;
