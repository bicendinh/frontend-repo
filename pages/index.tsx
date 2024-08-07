import { Button, Typography } from "@mui/material";
import withAuth from "@/hoc/withAuth";
import axios from "axios";
import { fetchUsers } from "@/apis/user";

function Page() {
  const handleButtonClick = async () => {
    try {
      const response = await fetchUsers();
      console.log(response.data);
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Typography variant="h5">Welcome to the main page!</Typography>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Trigger Endpoint
      </Button>
    </div>
  );
}

export default withAuth(Page);
