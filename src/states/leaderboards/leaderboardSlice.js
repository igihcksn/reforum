/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from 'constants';

const initialState = {
  loading: false,
  error: true,
  data: null,
};

export const fetchLeaderboardAsync = createAsyncThunk('leaderboard/fetchLeaderboard', async () => {
  const response = await fetch(`${BASE_URL.API}${BASE_URL.LEADERBOARDS}`);
  const responseJson = await response.json();
  return responseJson;
});

export const leaderboardSlice = createSlice({
  name: 'leaderboards',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload.data.leaderboards;
      });
  },
});

export const selectLeaderboard = (state) => state.leaderboards;

export default leaderboardSlice.reducer;
