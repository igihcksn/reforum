/* eslint-disable linebreak-style */
import { store } from 'utilities';

describe('User Redux State', () => {
  const mockUpResponse = {
    data: {
      users: [
        {
          id: 'user-1',
          name: 'John Doe',
          email: 'johndoe@mail.com',
          avatar: 'https://generated-image-url.jpg',
        },
      ],
    },
  };
  test('Have default value', () => {
    const state = store.getState().users;
    expect(state).toEqual({
      loading: false,
      error: true,
      data: null,
      authenticated: false,
      token: null,
    });
  });
  test('fetchLeaderboard, Pending', () => {
    store.dispatch({ type: 'user/fetchUser/pending' });

    const { loading } = store.getState().users;
    expect(loading).toBeFalsy();
  });
//   test('fetchLeaderboard, Fulfilled', () => {
//     store.dispatch({
//       type: 'user/fetchUser/fulfilled',
//       payload: {
//         data: mockUpResponse,
//       },
//     });

//     const { error, data, loading } = store.getState().users;
//     expect(loading).toBeFalsy();
//     expect(error).toBeFalsy();
//     expect(data).not.toBeNull();
//   });
});
