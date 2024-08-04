import { IconButton } from "@mui/material";
import React from "react";
import "./myStyles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";

function ChatArea() {
  const props1 = {
    name: "Test1",
    lastMessage: "Last Message #1",
    timestamp: "today",
  };

  return (
    <div className="chatArea-container">
      <div className="chatArea-header">
        <p className="con-icon">{props1.name[0]}</p>
        <div className="flex-grow">
          <p className="con-title">{props1.name}</p>
          <p className="con-timeStamp">{props1.timestamp}</p>
        </div>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="messages-container">
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
      </div>
      <div className="text-input-area">
        <input
          type="text"
          placeholder="Type a message"
          className="search-box"
        />
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatArea;
