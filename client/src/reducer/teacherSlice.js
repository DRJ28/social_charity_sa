import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet, fetchPost } from "../utils/apiCalls";

// export const fetchPendingApprovals = createAsyncThunk(
//   "teacher/getPendingApprovals",
//   async () => {
//     const respo = await fetchGet("/admin/getPendingApprovals");
//     return respo.data;
//   }
// );

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
  //   extraReducers: builder => {
  //     builder
  //       .addCase(fetchPendingApprovals.pending, (state, action) => {
  //         console.log("getting pending approvals details pending");
  //       })
  //       .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
  //         console.log("getting pending approvals details completed");
  //         state.pendingApprovalList = action.payload;
  //       })
  //       .addCase(fetchPendingApprovals.rejected, (state, action) => {
  //         console.log("getting pending approvals details rejected");
  //       });
  //   },
});

export const { setUploadFileContent } = teacherSlice.actions;

export default teacherSlice.reducer;
