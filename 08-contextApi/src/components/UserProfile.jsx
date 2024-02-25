import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function UserProfile() {
  const { user } = useContext(UserContext);

  if (!user) return <div>Please login first</div>;

  return (
    <>
      <div>Welcome to my react world - {user.username}</div>
    </>
  );
}

export default UserProfile;
