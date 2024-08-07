import { User } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  status: "idle" | "loading" | "succeeded" | "failed";
  users: User[];
}

const initialState: UserState = {
  status: "idle",
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart(state) {
      state.status = "loading";
    },
    loginSuccess(state) {
      state.status = "succeeded";
    },
    loginFailure(state) {
      state.status = "failed";
    },
    logout(state) {
      state.status = "idle";
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUsers } =
  userSlice.actions;
export default userSlice.reducer;
