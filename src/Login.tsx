import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
// @MUI
import {
  Box,
  Button,
  Container,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// BASE URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login():React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const navigate = useNavigate();
  const paperStyle = {
    p:2,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 2,
    gap: 1,
  };

  const handleCreateUser = () => {
    try{
      if (!email || !password) throw "Invalid User/Password";
      console.log("Create user: ", email, password);
    } catch (err) {
      console.error(err);
    }
  } 
  
  const handleLoginUser = () => {
    try{
      if (!email || !password) throw "Invalid User/Password";
      console.log("Login user: ", email, password);
    } catch (err) {
      console.error(err);
    }
  }

  

  return (
    <Container
      maxWidth="sm">
      {/* <Form method="post"> */}
        <Paper sx={paperStyle} elevation={10}>
          <Typography>Login into your account</Typography>
          <Box>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth={true}
              onChange={e => setEmail(e.target.value)} 
            />
            <FormControl fullWidth={true} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={ () => {
                      setShowPassword((show) => !show);
                    }}edge="end">
                      {showPassword ? (
                        <VisibilityOff/>
                      ) : (
                        <Visibility/>
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              color="primary"
              variant="contained"
              onClick={handleLoginUser}>Login</Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleCreateUser}>Register</Button>
          </Box>
        </Paper>
      {/* </Form> */}
    </Container>
  );
}

export default Login;