import React, { useState } from "react";
import logo from "../assets/logo.png";
import "./myStyles.css";
import {
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
    visible: false,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const sendSignupReq = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/user/register`,
        data
      );
      const token = getCookie("token");
      if (token) {
        localStorage.setItem("token", token);
        document.cookie =
          "token=; Max-Age=0; path=/; domain=" + window.location.hostname;
      }
      setAlert({
        severity: "success",
        message: "User registered successfully!",
        visible: true,
      });
      setTimeout(() => {
        navigate("/app/welcome");
      }, 2000);
    } catch (error) {
      setAlert({
        severity: "error",
        message: "There was an error signing up",
        visible: true,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="Logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        <p className="login-text">Create New Account</p>
        <Collapse in={alert.visible}>
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, visible: false })}
          >
            {alert.message}
          </Alert>
        </Collapse>
        <TextField
          id="standard-basic-1"
          label="Username"
          variant="outlined"
          onChange={(e) => {
            setData((prevData) => ({ ...prevData, name: e.target.value }));
          }}
        />
        <TextField
          id="standard-basic-2"
          label="Email"
          variant="outlined"
          onChange={(e) => {
            setData((prevData) => ({ ...prevData, email: e.target.value }));
          }}
        />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }));
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="outlined" onClick={sendSignupReq}>
          Sign Up
        </Button>
        <div className="text-blue-700 flex">
          <p>Already Registered?</p>
          <button
            className="link-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
