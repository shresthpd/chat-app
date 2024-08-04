import { Route, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer.jsx";
import Login from "./components/login.jsx";
import Welcome from "./components/welcome.jsx";
import ChatArea from "./components/ChatArea.jsx";
import CreateGroups from "./components/createGroups.jsx";
import Users from "./components/users.jsx";
import Groups from "./components/groups.jsx";
import SignUp from "./components/signup.jsx";
import dotenv from "dotenv";

function App() {
  return (
    <>
      <div className="bg-bgc h-screen flex justify-center items-center">
        {/* <MainContainer /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="app" element={<MainContainer />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="chat" element={<ChatArea />} />
            <Route path="users" element={<Users />} />
            <Route path="groups" element={<Groups />} />
            <Route path="create-groups" element={<CreateGroups />} />
          </Route>
        </Routes>
        {/* <Login /> */}
      </div>
    </>
  );
}

export default App;
