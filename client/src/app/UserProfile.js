import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import {
  insertUpdateUserDetails,
  setUserDbInfo,
} from "./../reducer/usersSlice";
import { pushToastNotification } from "./../reducer/appSlice";
import { fetchPost } from "../utils/apiCalls";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { userDbInfo, userLoginInfo } = useSelector(({ users }) => users);
  const [userRole, setUserRole] = useState(userDbInfo.USER_ROLE || "student");
  const [first_name, setFirstName] = useState(
    userDbInfo.FIRST_NAME || userLoginInfo.given_name
  );
  const [last_name, setLastName] = useState(
    userDbInfo.LAST_NAME || userLoginInfo.family_name
  );
  const [phone, setPhone] = useState(userDbInfo.USER_PHONE_NUMBER || "");
  const [address, setAddress] = useState(userDbInfo.USER_ADDRESS || "");
  const [dob, setDob] = useState(userDbInfo.DATE_OF_BIRTH);
  const updateDetails = async () => {
    const data = {
      userRole,
      first_name,
      last_name,
      address,
      phone,
      email: userLoginInfo.email,
      dob,
    };
    // const response = await dispatch(insertUpdateUserDetails(data));
    const respo = await fetchPost("/user/insertUpdateDetails", data);
    dispatch(pushToastNotification(respo.msg));
    dispatch(setUserDbInfo(respo));
  };
  return (
    <>
      <div className="hero-label">
        Welcome{" "}
        {userDbInfo?.first_name
          ? userDbInfo.first_name
          : userLoginInfo.given_name}
        {userDbInfo.ISAPPROVED === "pending" && (
          <p>
            Your profile is pending for approval from admin, please contact
            admin
          </p>
        )}
      </div>
      <Container className="user-profile">
        <Row>
          <Col xs={12} sm={4}>
            Your Email
          </Col>
          <Col xs={12} sm={8}>
            <Form.Control
              type="email"
              disabled
              value={userDbInfo.email || userDbInfo.USER_EMAILADDRESS}
              aria-describedby="User Email Fixed"
            />
          </Col>
        </Row>

        {/* {(userDbInfo.role !== "pending" || userDbInfo.role === "admin") && ( */}
        <Row>
          <Col xs={12} sm={4}>
            User Type
          </Col>
          <Col xs={12} sm={8}>
            <Form.Select
              onChange={e => setUserRole(e.target.value)}
              aria-label="Default select example"
              disabled={userDbInfo.ISAPPROVED != null}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            First Name
          </Col>
          <Col xs={12} sm={8}>
            <Form.Control
              type="text"
              id="firstName"
              onChange={e => setFirstName(e.target.value)}
              defaultValue={first_name}
              aria-describedby="User First Name"
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            Last Name
          </Col>
          <Col xs={12} sm={8}>
            <Form.Control
              type="text"
              id="lastName"
              onChange={e => setLastName(e.target.value)}
              defaultValue={last_name}
              aria-describedby="User Last Name"
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            Date Of Birth
          </Col>
          <Col xs={12} sm={8}>
            <Form.Control
              type="date"
              id="dateOfBirth"
              defaultValue={dob?.split("T")[0]}
              onChange={e => setDob(e.target.value)}
              // defaultValue={last_name}
              aria-describedby="User Date of Birth"
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            Mobile/Phone Number
          </Col>
          <Col xs={12} sm={8}>
            <Form.Control
              type="text"
              id="phoneNumber"
              defaultValue={phone}
              onChange={e => setPhone(e.target.value)}
              aria-describedby="User Phone Number"
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            Address
          </Col>
          <Col xs={12} sm={8}>
            <Form.Control
              as="textarea"
              id="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              aria-describedby="User Last Name"
            />
          </Col>
        </Row>

        <Button
          variant="primary"
          onClick={updateDetails}
          disabled={userDbInfo.ISAPPROVED != null}
          style={{ float: "right", marginTop: "1em" }}
        >
          Submit
        </Button>
      </Container>
    </>
  );
}
