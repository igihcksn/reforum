/* eslint-disable linebreak-style */
const { configureStore } = require('@reduxjs/toolkit');
const { store } = require('utilities');
const { fetchLeaderboardAsync, selectLeaderboard } = require('./leaderboardSlice');

describe('Leaderboard Redux State', () => {
  const mockUpResponse = {
    leaderboards: [
      {
        user: {
          id: 'user-1',
          name: 'John Doe',
          email: 'johndoe@mail.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
    ],
  };

  test('Have default value', () => {
    const state = store.getState().leaderboards;
    expect(state).toEqual({
      loading: false,
      error: true,
      data: null,
    });
  });
  test('fetchLeaderboard, Pending', () => {
    store.dispatch({ type: 'leaderboard/fetchLeaderboard/pending' });

    const { loading } = store.getState().leaderboards;
    expect(loading).toBeTruthy();
  });
  test('fetchLeaderboard, Fulfilled', () => {
    store.dispatch({
      type: 'leaderboard/fetchLeaderboard/fulfilled',
      payload: {
        data: mockUpResponse,
      },
    });

    const { error, data, loading } = store.getState().leaderboards;
    expect(loading).toBeFalsy();
    expect(error).toBeFalsy();
    expect(data).not.toBeNull();
  });
  test('Thunk fetchLeaderboardAsync', async () => {
    const localStore = configureStore({
      reducer: (state, action) => {
        if (action.type === 'leaderboard/fetchLeaderboard/fulfilled') {
          return action.payload;
        }
        return state;
      },
    });

    await localStore.dispatch(fetchLeaderboardAsync());
    localStore.dispatch(selectLeaderboard);
  });
});
