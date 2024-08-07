import { Container, Box, Typography, Button } from "@mui/material";
import withAuth from "@/hoc/withAuth";
import { fetchUsers } from "@/apis/user";
import { setUsers } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import UserTable from "@/components/UserTable";
import { useEffect, useState } from "react";
import CreateUserDialog from "@/components/CreateUserDialog";

function Page() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { users } = useAppSelector((state) => state.user);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadUsers = async () => {
    const response = await fetchUsers();
    const users = response.data;
    dispatch(setUsers(users));
  };

  const handleUserCreated = () => {
    setOpen(false);
    fetchUsers();
  };

  const handleTableUpdate = () => {
    fetchUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          User List
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create User
        </Button>
        <UserTable users={users} onTableUpdate={handleTableUpdate} />
        <CreateUserDialog
          open={open}
          onClose={handleClose}
          onUserCreated={handleUserCreated}
        />
      </Box>
    </Container>
  );
}

export default withAuth(Page);
