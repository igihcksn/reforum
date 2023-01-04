/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from 'constants';

const initialState = {
  loading: false,
  error: true,
  data: null,
};

export const listAsync = createAsyncThunk('thread/fetchTheread', async () => {
  const response = await fetch(`${BASE_URL.API}${BASE_URL.THREADS}`);
  const responseJson = await response.json();
  return responseJson;
});

export const detailThereadAsync = createAsyncThunk(
  'thread/fetchThereadById',
  async (threadId) => {
    const response = await fetch(
      `${BASE_URL.API}${BASE_URL.THREADS}/${threadId}`,
    );
    const responseJson = await response.json();
    return responseJson;
  },
);

export const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    filterThreadByCategory: (state, action) => {
      state.filtered = state.data.filter(
        (thread) => thread.category === action.payload,
      );
    },
    removeThreadByCategory: (state) => {
      state.filtered = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(listAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload.data.threads;
      })
      .addCase(detailThereadAsync.fulfilled, (state, action) => {
        state.detail = action.payload.data.detailThread;
      });
  },
});

export const { filterThreadByCategory, removeThreadByCategory } = threadSlice.actions;

export const selectThread = (state) => state.threads;
export const selectDetailThread = (state) => state.threads.detail;
export const selectCategoryThread = (state) => state.threads.data.filter((data) => data.category);

export default threadSlice.reducer;
