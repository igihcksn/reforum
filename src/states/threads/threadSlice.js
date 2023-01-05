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

export const createThereadAsync = createAsyncThunk('thread/createTheread', async ({ title, body, category }) => {
  const response = await fetch(`${BASE_URL.API}${BASE_URL.THREADS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify({ title, body, category }),
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, expired: responseJson.status === 'fail' };
  }

  return { error: false, data: responseJson.data.thread };
});

export const createCommentAsync = createAsyncThunk('thread/createComment', async ({ content, threadId }) => {
  const response = await fetch(`${BASE_URL.API}${BASE_URL.THREADS_COMMETS.replace(':id', threadId)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify({ content }),
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, expired: responseJson.status === 'fail' };
  }

  return { error: false, data: responseJson.data.comment };
});

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
      .addCase(createThereadAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createThereadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.expired = action.payload.data.expired;
        state.created = action.payload.data ?? true;
        state.data = [
          action.payload.data,
          ...state.data,
        ];
      })
      .addCase(createCommentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.expired = action.payload.data.expired;
        state.detail = {
          ...state.detail,
          comments: [
            action.payload.data,
            ...state.detail.comments,
          ],
        };
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
