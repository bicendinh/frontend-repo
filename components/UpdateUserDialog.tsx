import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { User } from "@/utils/types";
import { upsertUser } from "@/apis/user";

interface UpdateUserDialogProps {
  open: boolean;
  onClose: () => void;
  userToEdit: User | null;
  onUserUpdated: () => void;
}

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({
  open,
  onClose,
  userToEdit,
  onUserUpdated,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setDateOfBirth(userToEdit.dateOfBirth);
    }
  }, [userToEdit]);

  const handleUpdateUser = async () => {
    if (!validateForm() || !userToEdit) return;

    setLoading(true);
    try {
      await upsertUser({ id: userToEdit.id, name, email, dateOfBirth });
      onUserUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let valid = true;

    if (!name) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (!email) {
      setEmailError(true);
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    return valid;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <TextField
          required
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          error={nameError}
          helperText={nameError ? "Please enter your name" : ""}
        />
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          error={emailError}
          helperText={emailError ? "Please enter a valid email" : ""}
        />
        <TextField
          label="Date of Birth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: 2, gap: 2 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleUpdateUser}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserDialog;
