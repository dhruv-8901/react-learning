import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { userId } = useParams();
  return (
    <div className="text-center m-5 bg-gray-500 text-white p-5">
      User - {userId}
    </div>
  );
}

export default User;
