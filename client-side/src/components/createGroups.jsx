import { IconButton } from "@mui/material";
import React from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import "./myStyles.css";

function CreateGroups() {
  return (
    <div className="createGroups-container">
      <input
        type="text"
        className="search-box"
        placeholder="Enter Group Name"
      />
      <IconButton>
        <DoneOutlineIcon />
      </IconButton>
    </div>
  );
}

export default CreateGroups;
