import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
        state.token = action.payload;
    },
    logOut: (state) => {
        state.token = null;
        state.user = null;
    }
  },
})

export const {setToken, logOut } = authSlice.actions;

export default authSlice.reducer
