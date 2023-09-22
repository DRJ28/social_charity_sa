import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet, fetchPost } from "../utils/apiCalls";

export const fetchUserDetails = createAsyncThunk(
  "users/getDetails",
  async data => {
    const respo = await fetchPost("/user/getUserDetails", data);
    return respo;
  }
);

export const usersSlice = createSlice({
  name: "users",

  initialState: {
    userDbInfo: {},
    userLoginInfo: {},
  },

  reducers: {
    setUserLoginInfo: (state, action) => {
      state.userLoginInfo = action.payload;
    },
    setUserDbInfo: (state, action) => {
      state.userDbInfo = { ...state.userDbInfo, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserDetails.pending, (state, action) => {
        console.log("getting user details pending");
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        console.log("getting user details completed");
        localStorage.setItem("liu", action.payload.email);
        state.userDbInfo = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        console.log("getting user details rejected");
      });
  },
});

export const { setUserLoginInfo, setUserDbInfo } = usersSlice.actions;

export default usersSlice.reducer;
