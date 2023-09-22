import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet, fetchPost } from "../utils/apiCalls";

export const fetchPendingApprovals = createAsyncThunk(
  "users/getPendingApprovals",
  async () => {
    const respo = await fetchGet("/user/getPendingApprovals");
    return respo;
  }
);

export const adminSlice = createSlice({
  name: "users",

  initialState: {
    pendingApprovalList: [],
  },

  reducers: {
    setAppNavigation: (state, action) => {
      state.appNavigation = action.payload;
      console.log(`Rendering component ${action.payload}`);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPendingApprovals.pending, (state, action) => {
        console.log("getting pending approvals details pending");
      })
      .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
        console.log("getting pending approvals details completed");
        state.pendingApprovalList = action.payload;
      })
      .addCase(fetchPendingApprovals.rejected, (state, action) => {
        console.log("getting pending approvals details rejected");
      });
  },
});

export const { setAppNavigation } = adminSlice.actions;

export default adminSlice.reducer;
