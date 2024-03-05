import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  tokenType: "",
  expiresIn: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.tokenType = action.payload.tokenType;
      state.expiresIn = action.payload.expiresIn;
    },
  },
});

export const { login } = AuthSlice.actions;

export default AuthSlice.reducer;
