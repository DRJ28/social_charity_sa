import React, { useEffect, useState } from "react";
import {
  Image,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setAppNavigation } from "./../reducer/appSlice";

const roleActions = {
  admin: [
    { href: "ApproveEnrollment", display: "Approve/New Enrollment" },
    { href: "ViewStudents", display: "View Students" },
    { href: "ViewTeachers", display: "View Teachers" },
    { href: "FeedBack", display: "Feed Back" },
  ],
  teacher: [
    { href: "ApproveEnrollment", display: "Approve Enrollment" },
    { href: "ViewStudents", display: "View Students" },
    { href: "ViewTeachers", display: "View Teachers" },
    { href: "FeedBack", display: "Feed Back" },
  ],
  student: [
    { href: "ApproveEnrollment", display: "Approve Enrollment" },
    { href: "ViewStudents", display: "View Students" },
    { href: "ViewTeachers", display: "View Teachers" },
    { href: "FeedBack", display: "Feed Back" },
  ],
};

export default function NavigationBar() {
  const dispatch = useDispatch();
  const { userLoginInfo, userDbInfo } = useSelector(({ users }) => users);
  // const [userRole, setUserRole] = useState(userDbInfo.USER_ROLE || "pending");
  const userRole = userDbInfo.USER_ROLE;
  // if (userDbInfo.ISAPPROVED) {
  //   userRole = "pending";
  //   // setUserRole("pending");
  // }
  useEffect(() => {
    if (userDbInfo.ISAPPROVED !== "approved") {
      dispatch(setAppNavigation("UserProfile"));
    } else {
      dispatch(
        setAppNavigation(`${userRole[0].toUpperCase() + userRole.slice(1)}Home`)
      );
    }
  }, [userRole]);

  const setNav = compo => {
    dispatch(setAppNavigation(compo));
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          href="#"
          onClick={() =>
            setNav(
              userRole
                ? `${userRole[0].toUpperCase() + userRole.slice(1)}Home`
                : ""
            )
          }
        >
          Social Learning
        </Navbar.Brand>
        {userDbInfo.ISAPPROVED === "approved" && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Button
                  onClick={() =>
                    setNav(
                      `${userRole[0].toUpperCase() + userRole.slice(1)}Home`
                    )
                  }
                  variant="outline-dark"
                >
                  Home
                </Button>
                <Button
                  onClick={() => setNav("Profile")}
                  variant="outline-dark"
                >
                  Profile
                </Button>
                <NavDropdown title="Actions" id="basic-nav-dropdown">
                  {roleActions[userRole].map(action => (
                    <Button
                      onClick={() => setNav(action.href)}
                      key={action.href}
                      variant="outline-dark"
                    >
                      {action.display}
                    </Button>
                  ))}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
        <Image
          src={userLoginInfo.picture}
          roundedCircle
          style={{ width: "3%" }}
        />
      </Container>
    </Navbar>
  );
}
