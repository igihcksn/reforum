import { configureStore } from "@reduxjs/toolkit";
import threadsReducer from "states/threads/threadSlice";
import usersReducer from "states/users/userSlice";

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    users: usersReducer,
  },
});

export default store;
