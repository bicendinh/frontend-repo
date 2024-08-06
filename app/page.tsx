"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import LoginForm from "../components/LoginForm";
import { Button, Typography } from "@mui/material";
import axios from "axios";

const Home: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user);

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/protected-endpoint`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {token ? (
        <div>
          <Typography variant="h5">Welcome to the main page!</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Trigger Endpoint
          </Button>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Home;
