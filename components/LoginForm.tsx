"use client";

import React, { useState } from "react";
import { useAppDispatch } from "../store/store";
import { loginStart, loginSuccess, loginFailure } from "../store/userSlice";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Button, Typography } from "@mui/material";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      dispatch(loginSuccess(token));
    } catch (error) {
      dispatch(loginFailure());
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
