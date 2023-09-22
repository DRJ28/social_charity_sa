import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "users",

  initialState: {
    appNavigation: "Home",
  },

  reducers: {
    setAppNavigation: (state, action) => {
      state.appNavigation = action.payload;
      console.log(`Rendering component ${action.payload}`);
    },
  },
});

export const { setAppNavigation } = appSlice.actions;

export default appSlice.reducer;
