import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL } from './apiConfig';

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password, rememberme }, { rejectWithValue }) => {
    const result = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json());

    if (!result.status) {
      const { error_reason, message } = result;
      return rejectWithValue({
        error_reason,
        message,
      });
    } else {
      if (rememberme) {
        // Store user's token in local storage
        localStorage.setItem('userToken', result.access_token);
      }

      return result;
    }
  }
);

// Initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogged: (state, action) => {
      state.userInfo = action.payload;
    },
    userLogout: (state) => {
      localStorage.removeItem('userToken');
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload.user;
      state.userToken = payload.access_token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});

export const { userLogged, userLogout } = authSlice.actions;

export default authSlice.reducer;
