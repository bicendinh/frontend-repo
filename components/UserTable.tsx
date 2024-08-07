import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "@/utils/types";
import { deleteUser } from "@/apis/user";
import { useConfirm } from "material-ui-confirm";
import UpdateUserDialog from "./UpdateUserDialog";

interface UserTableProps {
  users: User[];
  onTableUpdate: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onTableUpdate }) => {
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const confirm = useConfirm();

  if (users.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ p: 2 }}>
        No users found
      </Typography>
    );
  }

  const onCloseEditUser = () => setUserToEdit(null);

  const onEditUser = (user: User) => {
    setUserToEdit(user);
  };

  const handleDelete = async (user: User) => {
    try {
      await confirm({
        title: "Confirm Delete",
        description: `Are you sure you want to delete user "${user?.name}"?`,
      });
      await deleteUser(user.id);
      onTableUpdate();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflow: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dateOfBirth}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onEditUser(user)}
                    aria-label="edit"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user)}
                    aria-label="delete"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateUserDialog
        open={!!userToEdit}
        onClose={onCloseEditUser}
        userToEdit={userToEdit}
        onUserUpdated={onTableUpdate}
      />
    </>
  );
};

export default UserTable;
