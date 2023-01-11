/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';

const initialState = {
  loading: false,
  error: true,
  data: null,
  authenticated: false,
  token: null,
};

export const listUserAsync = createAsyncThunk('user/fetchUsers', async () => {
  const response = await userAPI.fetchAll();
  return response;
});

export const registerUserAsync = createAsyncThunk('user/fetchRegisterUsers', async ({ name, email, password }) => {
  const response = await userAPI.register({ name, email, password });

  if (response.status !== 'success') {
    return { error: true, message: response.message };
  }

  return { error: false };
});

export const loginUserAsync = createAsyncThunk('user/fetchLoginUsers', async ({ email, password }) => {
  const response = await userAPI.login({ email, password });

  if (response.status !== 'success') {
    return { error: true };
  }

  return { error: false, token: response.data.token };
});

export const detailUserAsync = createAsyncThunk('user/fetchDetailUsers', async () => {
  const response = await userAPI.detail();

  if (response.status !== 'success') {
    return { error: true, expired: response.status === 'fail' };
  }

  return { error: false, data: response.data.user };
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
