import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.status = 'loading';
    },
    loginSuccess(state) {
      state.status = 'succeeded';
    },
    loginFailure(state) {
      state.status = 'failed';
    },
    logout(state) {
      state.status = 'idle';
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
