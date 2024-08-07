import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { upsertUser } from "@/apis/user";

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  open,
  onClose,
  onUserCreated,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleCreateUser = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await upsertUser({ name, email, dateOfBirth });
      onUserCreated();
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
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
      <DialogTitle>Create User</DialogTitle>
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
          onClick={handleCreateUser}
          variant="contained"
          sx={{ ml: 2 }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
