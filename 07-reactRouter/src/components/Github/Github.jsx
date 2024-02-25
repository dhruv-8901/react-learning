import { React, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const follower = useLoaderData();
  // const [follower, setFollower] = useState(0);

  // useEffect(() => {
  //   fetch("https://api.github.com/users/hiteshchoudhary")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       setFollower(res.followers);
  //     });
  // }, []);

  return (
    <div className="text-center m-5 bg-gray-500 text-white p-5">
      Github - {follower.followers}
    </div>
  );
}

export default Github;

export const githubFollowerCount = async () => {
  const data = await fetch("https://api.github.com/users/hiteshchoudhary");

  return data.json();
};
