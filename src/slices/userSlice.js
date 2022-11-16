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
    }
  },
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer
