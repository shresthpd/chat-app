import React, { useState } from "react";
import "./myStyles.css";
import Sidebar from "./sidebar.jsx";
import ChatArea from "./ChatArea.jsx";
import Welcome from "./welcome.jsx";
import CreateGroups from "./createGroups.jsx";
import Login from "./login.jsx";
import Users_groups from "./users.jsx";
import Users from "./users.jsx";
import { Outlet } from "react-router-dom";

function MainContainer() {
  const [chatData, setChatData] = useState();
  return (
    <div className="main-container">
      <Sidebar />
      <Outlet />
      {/* <ChatArea /> */}
      {/* <Welcome /> */}
      {/* <CreateGroups /> */}
      {/* <Login /> */}
      {/* <Users /> */}
    </div>
  );
}

export default MainContainer;
