import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import user from './slices/userSlice';

export const store = configureStore({
  reducer: {
    token: auth,
    user: user,
  },
})