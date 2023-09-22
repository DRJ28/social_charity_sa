import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet, fetchPost } from "../utils/apiCalls";

export const teacherSlice = createSlice({
  name: "teacher",

  initialState: {
    uploadFileContent: "",
  },

  reducers: {
    setUploadFileContent: (state, action) => {
      state.uploadFileContent = action.payload;
    },
  },
});

export const { setUploadFileContent } = teacherSlice.actions;

export default teacherSlice.reducer;
