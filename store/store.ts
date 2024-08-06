import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define RootState type from store's state
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
