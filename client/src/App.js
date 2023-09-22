import "./App.css";
import { useSelector } from "react-redux";
import GmailLogin from "./app/GmailLogin";
import LoginCarousel from "./app/LoginCarousel";
import LandingPage from "./app/LandingPage";

function App() {
  const userDbInfo = useSelector(({ users }) => users.userDbInfo);
  return (
    <>
      {userDbInfo.USER_EMAILADDRESS ? (
        <LandingPage />
      ) : (
        <>
          <LoginCarousel />
          <GmailLogin />
        </>
      )}
      {/* <ToastComponent /> */}
    </>
  );
}

export default App;
