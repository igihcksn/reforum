import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "constants";

const initialState = {
  loading: false,
  error: true,
  data: null,
  authenticated: false,
  token: null,
};

export const listUserAsync = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch(`${BASE_URL.API}${BASE_URL.USERS}`);
  const responseJson = await response.json();
  return responseJson;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(listUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(listUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload.data.users;
      });
  },
});

export const selectUser = (state) => state.users;

export default userSlice.reducer;
