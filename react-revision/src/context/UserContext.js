import React, { createContext, useContext } from "react";

export const UserContext = createContext({
  user: [
    {
      name: "dhruv",
    },
  ],
});

export const UserContextProvider = UserContext.Provider;

// custom hooks
export const useUser = () => {
  return useContext(UserContext);
};
