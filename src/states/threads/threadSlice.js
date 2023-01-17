/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import threadAPI from './threadAPI';

const initialState = {
  loading: false,
  error: true,
  data: null,
};

export const listAsync = createAsyncThunk('thread/fetchTheread', async () => {
  const response = await threadAPI.fetchAll();
  return response;
});

export const detailThereadAsync = createAsyncThunk(
  'thread/fetchThereadById',
  async (threadId) => {
    const response = await threadAPI.detailThread(threadId);
    return response;
  },
);

export const createThereadAsync = createAsyncThunk('thread/createTheread', async ({ title, body, category }) => {
  const response = await threadAPI.createThread({ title, body, category });

  if (response.status !== 'success') {
    return { error: true, expired: response.status === 'fail' };
  }

  return { error: false, data: response.data.thread };
});

export const createCommentAsync = createAsyncThunk('thread/createComment', async ({ content, threadId }) => {
  const response = await threadAPI.createComment({ content, threadId });

  if (response.status !== 'success') {
    return { error: true, expired: response.status === 'fail' };
  }

  return { error: false, data: response.data.comment };
});

export const upVoteCommentAsync = createAsyncThunk('thread/upVoteComment', async ({ threadId, commentId }) => {
  const response = await threadAPI.upVoteComment({ threadId, commentId });

  if (response.status !== 'success') {
    return { error: true, expired: response.status === 'fail' };
  }

  return { error: false, data: response.data.vote };
});

export const downVoteCommentAsync = createAsyncThunk('thread/downVoteComment', async ({ threadId, commentId }) => {
  const response = await threadAPI.downVoteComment({ threadId, commentId });

  if (response.status !== 'success') {
    return { error: true, expired: response.status === 'fail' };
  }

  return { error: false, data: response.data.vote };
});

export const upVoteThreadAsync = createAsyncThunk('thread/upVote', async ({ threadId }) => {
  const response = await threadAPI.upVoteTheread({ threadId });

  if (response.status !== 'success') {
    return { error: true, expired: response.status === 'fail' };
  }

  return { error: false, data: response.data.vote };
});

export const downVoteThreadAsync = createAsyncThunk('thread/downVote', async ({ threadId }) => {
  const response = await threadAPI.downVoteTheread({ threadId });

  if (response.status !== 'success') {
    return { error: true, expired: response.status === 'fail' };
  }

  return { error: false, data: response.data.vote };
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
      .addCase(upVoteThreadAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(upVoteThreadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.expired = action.payload.data.expired;
        state.detail = {
          ...state.detail,
          upVotesBy: [
            action.payload.data.userId,
            ...state.detail.upVotesBy,
          ],
        };
      })
      .addCase(downVoteThreadAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(downVoteThreadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.expired = action.payload.data.expired;
        state.detail = {
          ...state.detail,
          downVotesBy: [
            action.payload.data.userId,
            ...state.detail.downVotesBy,
          ],
        };
      })
      .addCase(upVoteCommentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(upVoteCommentAsync.fulfilled, (state, action) => {
        const indexComment = state.detail.comments.map(
          (comment) => comment.id,
        ).indexOf(action.payload.data.commentId);

        state.loading = false;
        state.expired = action.payload.data.expired;
        state.detail.comments[indexComment].upVotesBy = [
          action.payload.data.userId,
          ...state.detail.comments[indexComment].upVotesBy,
        ];
      })
      .addCase(downVoteCommentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(downVoteCommentAsync.fulfilled, (state, action) => {
        const indexComment = state.detail.comments.map(
          (comment) => comment.id,
        ).indexOf(action.payload.data.commentId);

        state.loading = false;
        state.expired = action.payload.data.expired;
        state.detail.comments[indexComment].downVotesBy = [
          action.payload.data.userId,
          ...state.detail.comments[indexComment].downVotesBy,
        ];
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
