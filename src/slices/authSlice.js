import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setToken: (state, action) => {
        state.token = action.payload;
    },
    logOut: (state) => {
        state.token = null;
    }
  },
})

export const {setToken, logOut } = authSlice.actions;

export default authSlice.reducer
