import React, { useState } from "react";
import { loginStart, loginFailure, loginSuccess } from "../store/userSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import { RootState } from "@/store";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const status = useAppSelector((state: RootState) => state.user.status);

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      await axios.post("/api/login", { email, password });
      dispatch(loginSuccess());
      window.location.pathname = "/";
    } catch (err: any) {
      dispatch(loginFailure());
      console.error("Error logging in:", err);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        width: { xs: "90%", sm: "400px" },
        mx: "auto",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom>
        EBUDDY PTE. LTD Login
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={status === "loading"}
      >
        {status === "loading" && <CircularProgress size={24} />}
        {"  "} Login
      </Button>
    </Box>
  );
};

export default LoginForm;
