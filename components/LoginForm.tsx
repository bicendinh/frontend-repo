import React, { useState } from "react";
import { loginStart, loginFailure, loginSuccess } from "../store/userSlice";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    dispatch(loginStart());
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(loginSuccess());
      window.location.pathname = "/";
    } else {
      const errorData = await res.json();
      dispatch(loginFailure());
      console.error("Error logging in:", errorData.error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
