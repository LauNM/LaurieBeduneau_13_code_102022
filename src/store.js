import { 
  configureStore,
  combineReducers,
  getDefaultMiddleware
 } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import user from './slices/userSlice';

const combinedReducer = combineReducers({
  token: auth,
  user: user,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logOut') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()]
})