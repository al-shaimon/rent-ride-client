import { RootState } from "./../../store";
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};

type TAuthState = {
  user: null | TUser;
  currentUser: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  currentUser: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    loginSuccess(state, action) {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { setUser, loginSuccess, logout } = authSlice.actions;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
