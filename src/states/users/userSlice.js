/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from 'constants';

const initialState = {
  loading: false,
  error: true,
  data: null,
  authenticated: false,
  token: null,
};

export const listUserAsync = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch(`${BASE_URL.API}${BASE_URL.USERS}`);
  const responseJson = await response.json();
  return responseJson;
});

export const registerUserAsync = createAsyncThunk('user/fetchRegisterUsers', async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL.API}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, message: responseJson.message };
  }

  return { error: false };
});

export const loginUserAsync = createAsyncThunk('user/fetchLoginUsers', async ({ email, password }) => {
  const response = await fetch(`${BASE_URL.API}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true };
  }

  return { error: false, token: responseJson.data.token };
});

export const detailUserAsync = createAsyncThunk('user/fetchDetailUsers', async () => {
  const response = await fetch(`${BASE_URL.API}${BASE_URL.USER_DETAIL}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, expired: responseJson.status === 'fail' };
  }

  return { error: false, data: responseJson.data.user };
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUnAuthorizedUser: (state) => {
      state.authenticated = false;
      state.token = null;
    },
    setRefreshAuthorizedUser: (state) => {
      state.authenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(listUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload.data.users;
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = !action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { error, token } = action.payload;
        state.loading = false;
        state.authenticated = !error;
        state.token = token;
      })
      .addCase(detailUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(detailUserAsync.fulfilled, (state, action) => {
        const { error, expired, data } = action.payload;
        state.loading = false;
        state.expired = expired;
        state.error = !error;
        state.detail = data;
      });
  },
});

export const { setRefreshAuthorizedUser, setUnAuthorizedUser } = userSlice.actions;

export const selectUser = (state) => state.users;

export default userSlice.reducer;
