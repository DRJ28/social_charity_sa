import React from "react";
import { useDispatch } from "react-redux";
import { fetchPendingApprovals } from "../reducer/adminSlice";

export default function ApproveEnrollment() {
  const dispatch = useDispatch();
  dispatch(fetchPendingApprovals());
  return <div>ApproveEnrollment</div>;
}
