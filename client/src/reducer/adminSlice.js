import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet, fetchPost } from "../utils/apiCalls";

export const fetchPendingApprovals = createAsyncThunk(
  "admin/getPendingApprovals",
  async () => {
    const respo = await fetchGet("/admin/getPendingApprovals");
    return respo.data;
  }
);

export const adminSlice = createSlice({
  name: "admin",

  initialState: {
    pendingApprovalList: [],
  },

  reducers: {
    setAppNavigation: (state, action) => {
      state.appNavigation = action.payload;
      console.log(`Rendering component ${action.payload}`);
    },
    setPendingApproveList: (state, action) => {
      state.pendingApprovalList = action.payload;
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

export const { setAppNavigation, setPendingApproveList } = adminSlice.actions;

export default adminSlice.reducer;
