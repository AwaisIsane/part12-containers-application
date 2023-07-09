import { createSlice } from "@reduxjs/toolkit";
import userListSrv from "../services/userList";

const initialState = [];

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    setUserList(state, action) {
      return action.payload;
    },
  },
});

export const getUserList = () => {
  return async (dispatch) => {
    const response = await userListSrv.getAll();
    dispatch(setUserList(response));
  };
};
export const { setUserList } = userListSlice.actions;
export default userListSlice.reducer;
