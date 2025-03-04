import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  value: {
    firstname: null,
    lastname: null,
    email: null,
    dateOfBirth: null,
    token: null, 
    status: null,
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
        status: false,
      };
    },
    loginUser: (state, action) => {
      state.value = {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        dateOfBirth: action.payload.dateOfBirth,
        token: action.payload.token,
        status: action.payload.token,
      };
       // Ajoutez un console.log pour vérifier ce qui est stocké
      console.log("État actuel du reducer user après loginUser:", state.value);
    },
    signUpUser: (state, action) => {
      state.value = {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        dateOfBirth: action.payload.dateOfBirth,
        token: action.payload.token,
        status: action.payload.token,
      };
       // Ajoutez un console.log pour vérifier ce qui est stocké
      console.log("État actuel du reducer user après signUpUser:", state.value);
    },
     // Action to log out user
     logOut: (state) => {
      state.value = initialState.value; // Réinitialise l'état à l'état initial
      console.log("État actuel du reducer user après logOut:", state.value);
    },
  },
});

// Exporter les actions
export const { signUpUser, loginUser, updateUser, resetUser, logOut } = userSlice.actions;
export default userSlice.reducer;