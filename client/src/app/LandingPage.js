import React from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { useSelector } from "react-redux";

import UserProfile from "./UserProfile";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import AdminHome from "./AdminHome";
import TeacherHome from "./TeacherHome";
import StudentHome from "./StudentHome";
import ApproveEnrollment from "./ApproveEnrollment";

export default function LandingPage() {
  const app = useSelector(({ app }) => app);
  const getRouteComponent = () => {
    switch (app.appNavigation) {
      case "Home":
        return <Home />;
      case "UserProfile":
        return <UserProfile />;
      case "AdminHome":
        return <AdminHome />;
      case "ApproveEnrollment":
        return <ApproveEnrollment />;
      case "TeacherHome":
        return <TeacherHome />;
      case "StudentHome":
        return <StudentHome />;
      default:
        return <ErrorPage />;
    }
  };
  return (
    <Container>
      <NavigationBar />

      {getRouteComponent()}
    </Container>
  );
}
