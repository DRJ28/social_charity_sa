import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingApprovals,
  setPendingApproveList,
} from "../reducer/adminSlice";
import { fetchPost } from "../utils/apiCalls";
import { Row, Col, Form, Container, Button, ListGroup } from "react-bootstrap";

export default function ApproveEnrollment() {
  const dispatch = useDispatch();
  const adminState = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchPendingApprovals());
  }, []);

  const approveEntry = async entry => {
    const response = await fetchPost("/admin/approveEntry", entry);
    if (response.data.status === "approved") {
      let newList = [];
      adminState.pendingApprovalList.forEach(list => {
        if (list.USER_EMAILADDRESS === entry.USER_EMAILADDRESS) {
          const nList = { ...list, ...{ ISAPPROVED: "approved" } };
          newList.push(nList);
        } else {
          newList.push(list);
        }
      });
      dispatch(setPendingApproveList(newList));
    }
  };

  return (
    <>
      <div>ApproveEnrollment</div>
      <ListGroup>
        {adminState?.pendingApprovalList?.map(list => {
          return (
            <ListGroup.Item key={list.USER_EMAILADDRESS}>
              <Row>
                <Col>Name: {list.FIRST_NAME}</Col>
                <Col>Email: {list.USER_EMAILADDRESS}</Col>
                <Col>Role: {list.USER_ROLE}</Col>
                <Col>ProfileStatus: {list.ISAPPROVED}</Col>
                {list.ISAPPROVED === "pending" ? (
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => approveEntry(list)}
                      style={{ float: "right", marginTop: "1em" }}
                    >
                      Approve
                    </Button>
                  </Col>
                ) : (
                  <Col>
                    <Button
                      variant="primary"
                      disabled
                      style={{ float: "right", marginTop: "1em" }}
                    >
                      edit
                    </Button>
                  </Col>
                )}
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}
