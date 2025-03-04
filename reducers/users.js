import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  value: {
    firstname: null,
    lastname: null,
    email: null,
    dateOfBirth: null,
    token: null, 
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to update user
    updateUser: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    // Action to reset user
    resetUser: (state) => {
      state.value = {
        firstname: null,
        lastname: null,
        email: null,
        dateOfBirth: null,
      };
    },
  },
});

// Exporter les actions
export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;