import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet, fetchPost } from "../utils/apiCalls";

export const studentSlice = createSlice({
  name: "student",

  initialState: {
    viewMyContents: [],
  },

  reducers: {
    setViewMyContents: (state, action) => {
      state.viewMyContents = action.payload;
    },
  },
});

export const { setViewMyContents } = studentSlice.actions;

export default studentSlice.reducer;
