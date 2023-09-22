import "./App.css";
import { useSelector } from "react-redux";
import GmailLogin from "./app/GmailLogin";
import LoginCarousel from "./app/LoginCarousel";
import LandingPage from "./app/LandingPage";
import ToastComponent from "./utils/ToastComponent";

function App() {
  const userDbInfo = useSelector(({ users }) => users.userDbInfo);
  return (
    <>
      {userDbInfo.role || userDbInfo.ISAPPROVED === false ? (
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
