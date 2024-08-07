import { Container, Box, Typography, Button } from "@mui/material";
import withAuth from "@/hoc/withAuth";
import { fetchUsers } from "@/apis/user";
import { setUsers } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import UserTable from "@/components/UserTable";
import { useEffect, useState } from "react";
import CreateUserDialog from "@/components/CreateUserDialog";
import axios from "axios";

function Page() {
  const dispatch = useAppDispatch();
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const { users } = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      setIsLogout(true);
      await axios.post("/api/logout");
      setIsLogout(false);
      window.location.pathname = "/login";
    } catch (err: any) {
      console.error("Error logging in:", err);
    }
  };
  const handleOpenCreateUserDialog = () => {
    setOpenCreateUserDialog(true);
  };

  const handleClose = () => {
    setOpenCreateUserDialog(false);
  };

  const loadUsers = async () => {
    const response = await fetchUsers();
    const users = response.data;
    dispatch(setUsers(users));
  };

  const handleUserCreated = () => {
    setOpenCreateUserDialog(false);
    loadUsers();
  };

  const handleTableUpdate = () => {
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          justifyContent="space-between"
        >
          <Typography variant="h4" component="h4" gutterBottom>
            User List
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenCreateUserDialog}
              sx={{ ml: 2 }}
            >
              Create User
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
               {isLogout ? "Remove session..." : "Logout"}
            </Button>
          </Box>
        </Box>
        <UserTable users={users} onTableUpdate={handleTableUpdate} />
        <CreateUserDialog
          open={openCreateUserDialog}
          onClose={handleClose}
          onUserCreated={handleUserCreated}
        />
      </Box>
    </Container>
  );
}

export default withAuth(Page);
