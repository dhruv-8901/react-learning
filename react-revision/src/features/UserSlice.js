import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      name: " dhruv",
    },
  ],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { add } = UserSlice.actions;

export default UserSlice.reducer;
