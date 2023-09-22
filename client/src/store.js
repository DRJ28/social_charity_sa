import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducer/usersSlice";
import appSlice from "./reducer/appSlice";
import adminSlice from "./reducer/adminSlice";
import teacherSlice from "./reducer/teacherSlice";
import studentSlice from "./reducer/studentSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    app: appSlice,
    admin: adminSlice,
    teacher: teacherSlice,
    student: studentSlice,
  },
});
