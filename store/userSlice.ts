import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  token: null,
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.status = 'loading';
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.status = 'succeeded';
      state.token = action.payload;
    },
    loginFailure(state) {
      state.status = 'failed';
    },
    logout(state) {
      state.status = 'idle';
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
