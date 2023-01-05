/* eslint-disable linebreak-style */
import { configureStore } from '@reduxjs/toolkit';
import threadsReducer from 'states/threads/threadSlice';
import leaderboardsReducer from 'states/leaderboards/leaderboardSlice';
import usersReducer from 'states/users/userSlice';

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
