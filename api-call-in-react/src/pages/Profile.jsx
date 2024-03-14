import React, { useEffect, useState } from "react";
import { axiosTemplate } from "../common/helper";
import { Button } from "../components";

function Profile() {
  const sessionData = sessionStorage.getItem("userData");
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sessionData) {
          const userData = JSON.parse(sessionData);
          const axiosInstance = axiosTemplate(userData.accessToken);
          const profile = await axiosInstance.get("user");
          setUserProfile(profile.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mx-auto w-[300px] rounded-md border mt-6">
        <div className="p-4">
          <h1 className="text-lg font-semibold">
            {userProfile && userProfile.name}
          </h1>
          <h6 className="mt-3 font-medium">
            {userProfile && userProfile.email}
          </h6>
          <p className="mt-3 text-sm text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            debitis?
          </p>
          <Button type="button" name="Edit" className="mb-4 px-28" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
