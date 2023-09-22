import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { fetchUserDetails, setUserLoginInfo } from "./../reducer/usersSlice";
import { useDispatch } from "react-redux";

export default function GmailLogin() {
  const dispatch = useDispatch();
  const responseMessage = response => {
    const { family_name, given_name, email, email_verified, picture } =
      jwt_decode(response.credential);
    const userData = {
      family_name,
      given_name,
      email,
      email_verified,
      picture,
    };
    dispatch(setUserLoginInfo(userData));
    dispatch(fetchUserDetails(userData));
  };

  const errorMessage = error => {
    console.log(error);
  };

  return (
    <Alert variant={"light"} className="gmail-login">
      <Row>
        <Col>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </Col>
        <Col>Use Gmail login to get started</Col>
      </Row>
    </Alert>
  );
}
