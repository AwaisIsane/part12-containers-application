import { createSlice } from "@reduxjs/toolkit";
import loginSrv from "../services/login";

const initialState = { username: null, name: null, token: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    unsetUser(state, action) {
      return { ...initialState };
    },
  },
});

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const loggedInResponse = await loginSrv.login({ username, password });
    dispatch(setUser(loggedInResponse));
  };
};

export const logout = () => {
  return async (dispatch) => {
    loginSrv.logout();
    dispatch(unsetUser());
  };
};

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;
