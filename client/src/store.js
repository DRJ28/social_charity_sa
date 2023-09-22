import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducer/usersSlice";
import appSlice from "./reducer/appSlice";
import adminSlice from "./reducer/adminSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    app: appSlice,
    admin: adminSlice,
  },
});
