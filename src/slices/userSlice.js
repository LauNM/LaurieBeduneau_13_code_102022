import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  id: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    logOut: () => {
      return {...initialState}
  }
  },
})

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer
