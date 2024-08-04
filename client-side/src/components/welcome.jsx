import React from "react";
import logo from "../assets/logo.png";
import "./myStyles.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <img src={logo} alt="logo" className="welcome-logo" />
      <p>View and test directly to people in the Chat Rooms</p>
    </div>
  );
}

export default Welcome;
