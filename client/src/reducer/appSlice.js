import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "users",

  initialState: {
    appNavigation: "Home",
    toastNotification: [],
  },

  reducers: {
    setAppNavigation: (state, action) => {
      state.appNavigation = action.payload;
      console.log(`Rendering component ${action.payload}`);
    },
    pushToastNotification: (state, action) => {
      state.toastNotification = [
        ...state.toastNotification,
        ...[action.payload],
      ];
    },
  },
});

export const { setAppNavigation, pushToastNotification } = appSlice.actions;

export default appSlice.reducer;
