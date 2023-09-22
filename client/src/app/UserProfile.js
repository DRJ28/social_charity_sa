import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Form, Container, Button } from "react-bootstrap";

export default function UserProfile() {
  const { userDbInfo, userLoginInfo } = useSelector(({ users }) => users);
  return (
    <>
      <div className="hero-label">
        Welcome{" "}
        {userDbInfo?.first_name
          ? userDbInfo.first_name
          : userLoginInfo.given_name}
        {userDbInfo.role === "pending" && (
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
              value={userDbInfo.email}
              aria-describedby="User Email Fixed"
            />
          </Col>
        </Row>

        {(userDbInfo.role !== "pending" || userDbInfo.role === "admin") && (
          <Row>
            <Col xs={12} sm={4}>
              User Type
            </Col>
            <Col xs={12} sm={8}>
              <Form.Select
                aria-label="Default select example"
                disabled={userDbInfo.role !== "admin"}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Form.Select>
            </Col>
          </Row>
        )}

        <Row>
          <Col xs={12} sm={4}>
            First Name
          </Col>
          <Col xs={12} sm={8}>
            <Form.Control
              type="text"
              id="firstName"
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
              aria-describedby="User Last Name"
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
              aria-describedby="User Last Name"
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
              aria-describedby="User Last Name"
            />
          </Col>
        </Row>

        <Button variant="primary" style={{ float: "right", marginTop: "1em" }}>
          Submit
        </Button>
      </Container>
    </>
  );
}
