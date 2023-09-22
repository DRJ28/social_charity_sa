import React, { useEffect } from "react";
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
  let currentRole = userDbInfo.role;
  if (!userDbInfo.ISAPPROVED) {
    currentRole = "pending";
  }
  useEffect(() => {
    if (currentRole === "pending") {
      dispatch(setAppNavigation("UserProfile"));
    } else {
      dispatch(
        setAppNavigation(
          `${currentRole[0].toUpperCase() + currentRole.slice(1)}Home`
        )
      );
    }
  }, [currentRole]);

  const setNav = compo => {
    dispatch(setAppNavigation(compo));
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          href="#"
          onClick={() =>
            setNav(`${currentRole[0].toUpperCase() + currentRole.slice(1)}Home`)
          }
        >
          Social Learning
        </Navbar.Brand>
        {currentRole !== "pending" && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Button
                  onClick={() =>
                    setNav(
                      `${
                        currentRole[0].toUpperCase() + currentRole.slice(1)
                      }Home`
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
                  {roleActions[currentRole].map(action => (
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
