import React from "react";
import "./myStyles.css";

function MessageSelf() {
  var props2 = { name: "RandomUser", message: "This is a Sample message" };
  return (
    <div className="self-message-container">
      <div className="messageBox">
        <p>{props2.message}</p>
        <p className="self-timeStamp">12:00am</p>
      </div>
    </div>
  );
}

export default MessageSelf;
