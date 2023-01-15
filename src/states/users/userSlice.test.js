/* eslint-disable linebreak-style */
import { configureStore } from '@reduxjs/toolkit';
import { store } from 'utilities';
import userAPI from './userAPI';
import {
  detailUserAsync,
  listUserAsync,
  loginUserAsync,
  registerUserAsync,
  selectUser,
  setRefreshAuthorizedUser,
  setUnAuthorizedUser,
} from './userSlice';

jest.mock('./userAPI');

describe('User Redux State', () => {
  let api;

  beforeAll(() => {
    api = userAPI;
  });

  afterAll(() => {
    jest.unmock('./userAPI');
  });

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

  test('fetchUser, Pending', () => {
    store.dispatch({ type: 'user/fetchUsers/pending' });

    const { loading } = store.getState().users;
    expect(loading).toBeTruthy();
  });

  test('fetchUser, Fulfilled', () => {
    store.dispatch({
      type: 'user/fetchUsers/fulfilled',
      payload: {
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
      },
    });

    const { error, data, loading } = store.getState().users;
    expect(loading).toBeFalsy();
    expect(error).toBeFalsy();
    expect(data).not.toBeNull();
  });

  test('fetchRegisterUsers, Pending', () => {
    store.dispatch({ type: 'user/fetchRegisterUsers/pending' });

    const { loading } = store.getState().users;
    expect(loading).toBeTruthy();
  });

  test('fetchRegisterUsers, Fulfilled', () => {
    store.dispatch({
      type: 'user/fetchRegisterUsers/fulfilled',
      payload: {
        error: false,
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
        message: 'Success',
      },
    });

    const { registered, message, loading } = store.getState().users;
    expect(loading).toBeFalsy();
    expect(registered).toBeTruthy();
    expect(message).not.toBeNull();
  });

  test('fetchLoginUsers, Pending', () => {
    store.dispatch({ type: 'user/fetchLoginUsers/pending' });

    const { loading } = store.getState().users;
    expect(loading).toBeTruthy();
  });

  test('fetchLoginUsers, Fulfilled', () => {
    store.dispatch({
      type: 'user/fetchLoginUsers/fulfilled',
      payload: {
        error: false,
        token: 'random token',
      },
    });

    const { authenticated, token, loading } = store.getState().users;
    expect(loading).toBeFalsy();
    expect(authenticated).toBeTruthy();
    expect(token).not.toBeNull();
  });

  test('fetchDetailUsers, Pending', () => {
    store.dispatch({ type: 'user/fetchDetailUsers/pending' });

    const { loading } = store.getState().users;
    expect(loading).toBeTruthy();
  });

  test('fetchDetailUsers, Fulfilled', () => {
    store.dispatch({
      type: 'user/fetchDetailUsers/fulfilled',
      payload: {
        error: false,
        expired: false,
        data: {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'johndoe@mail.com',
            avatar: 'https://generated-image-url.jpg',
          },
        },
      },
    });

    const { error, expired, detail } = store.getState().users;
    expect(error).toBeTruthy();
    expect(expired).toBeFalsy();
    expect(detail).toBeDefined();
  });

  test('Reducer setUnAuthorizedUser', () => {
    store.dispatch(setUnAuthorizedUser());
    const state = store.getState().users;
    expect(state.token).toBe(null);
  });

  test('Reducer setRefreshAuthorizedUser', () => {
    store.dispatch(setRefreshAuthorizedUser());
    const state = store.getState().users;
    expect(state.authenticated).toBeTruthy();
  });

  describe('Thunk test', () => {
    test('Thunk listUserAsync', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
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
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'user/fetchUsers/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(listUserAsync(null));
      localStore.dispatch(selectUser);
      expect(fetchSpy).not.toBeCalled();
    });

    test('Thunk registerUserAsync', async () => {
      api.registerUserAsync = () => Promise.resolve({
        status: 'success',
        message: 'Account register success',
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'user/fetchRegisterUsers/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(registerUserAsync({
        name: 'udin',
        email: 'udin@mail.com',
        password: 'adminaja',
      }));
      expect(api.registerUserAsync).toBeDefined();
    });

    test('Thunk loginUserAsync', async () => {
      api.loginUserAsync = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          token: 'secret token',
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'user/fetchLoginUsers/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(loginUserAsync({
        email: 'udin@mail.com',
        password: 'adminaja',
      }));
      expect(api.loginUserAsync).toBeDefined();
    });

    test('Thunk detailUserAsync', async () => {
      api.detailUserAsync = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'johndoe@mail.com',
            avatar: 'https://generated-image-url.jpg',
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'user/fetchDetailUsers/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(detailUserAsync({
        email: 'udin@mail.com',
        password: 'adminaja',
      }));
      expect(api.detailUserAsyncs).toBeDefined();
    });
  });
});
