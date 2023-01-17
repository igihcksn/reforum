/* eslint-disable linebreak-style */
import { configureStore } from '@reduxjs/toolkit';
import { store } from 'utilities';
import threadAPI from './threadAPI';
import reducer, {
  createCommentAsync,
  createThereadAsync,
  detailThereadAsync,
  downVoteCommentAsync,
  downVoteThreadAsync,
  filterThreadByCategory,
  listAsync,
  removeThreadByCategory,
  selectThread,
  upVoteCommentAsync,
  upVoteThreadAsync,
} from './threadSlice';

describe('Thread Redux State', () => {
  let api;

  beforeAll(() => {
    api = threadAPI;
  });

  afterAll(() => {
    jest.unmock('./threadAPI');
  });

  test('Have default value', () => {
    const state = store.getState().threads;
    expect(state).toEqual({
      loading: false,
      error: true,
      data: null,
    });
  });

  test('fetchTheread, Pending', () => {
    store.dispatch({ type: 'thread/fetchTheread/pending' });

    const { loading } = store.getState().threads;
    expect(loading).toBeTruthy();
  });

  test('fetchTheread, Fulfilled', () => {
    store.dispatch({
      type: 'thread/fetchTheread/fulfilled',
      payload: {
        data: {
          threads: [
            {
              id: 'thread-1',
              title: 'Thread Pertama',
              body: 'Ini adalah thread pertama',
              category: 'General',
              createdAt: '2021-06-21T07:00:00.000Z',
              ownerId: 'users-1',
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 0,
            },
          ],
        },
      },
    });
  });

  test('createTheread, Pending', () => {
    store.dispatch({ type: 'thread/createTheread/pending' });

    const { loading } = store.getState().threads;
    expect(loading).toBeTruthy();
  });

  test('createTheread, Fulfilled', () => {
    store.dispatch({
      type: 'thread/createTheread/fulfilled',
      payload: {
        data: {
          threads: [
            {
              id: 'thread-1',
              title: 'Thread Pertama',
              body: 'Ini adalah thread pertama',
              category: 'General',
              createdAt: '2021-06-21T07:00:00.000Z',
              ownerId: 'users-1',
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 0,
            },
          ],
        },
      },
    });

    const { error, data, loading } = store.getState().threads;
    expect(loading).toBeFalsy();
    expect(error).toBeFalsy();
    expect(data).toBeDefined();
  });

  test('createComment, Pending', () => {
    store.dispatch({ type: 'thread/createComment/pending' });

    const { loading } = store.getState().threads;
    expect(loading).toBeTruthy();
  });

  test('Reducer filterThreadByCategory', () => {
    const prevState = {
      data: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };
    reducer(prevState, filterThreadByCategory({
      data: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    }));
    const state = store.getState().threads;
    expect(state.data).not.toBe(null);
  });

  test('Reducer removeThreadByCategory', () => {
    let state = store.getState().threads;
    store.dispatch(removeThreadByCategory({
      data: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    }));
    state = store.getState().threads;
    expect(state.filtered).not.toBeDefined();
  });

  describe('Thunk test', () => {
    test('Thunk listAsync', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        data: {
          threads: [
            {
              id: 'thread-1',
              title: 'Thread Pertama',
              body: 'Ini adalah thread pertama',
              category: 'General',
              createdAt: '2021-06-21T07:00:00.000Z',
              ownerId: 'users-1',
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 0,
            },
          ],
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'thread/fetchTheread/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(listAsync(null));
      localStore.dispatch(selectThread);
      expect(fetchSpy).toBeCalled();
    });

    test('Thunk detailThereadAsync', async () => {
      api.detailThereadAsync = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          detailThread: {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Ini adalah komentar pertama',
                createdAt: '2021-06-21T07:00:00.000Z',
                owner: {
                  id: 'users-1',
                  name: 'John Doe',
                  avatar: 'https://generated-image-url.jpg',
                },
                upVotesBy: [],
                downVotesBy: [],
              },
            ],
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'thread/fetchDetailUsers/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(detailThereadAsync('thread-1'));
      expect(api.detailThereadAsync).toBeDefined();
    });

    test('Thunk createThereadAsync', async () => {
      api.createThereadAsync = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          thread: {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'thread/createTheread/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(createThereadAsync({
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
      }));
      expect(api.createThereadAsync).toBeDefined();
    });

    test('Thunk createCommentAsync', async () => {
      api.createCommentAsync = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          comment: {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            upVotesBy: [],
            downVotesBy: [],
            owner: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
            },
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'thread/createComment/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(createCommentAsync({
        threadId: 'comment-1',
        content: 'Ini adalah komentar pertama',
      }));
      expect(api.createCommentAsync).toBeDefined();
    });

    test('Thunk upVoteCommentAsync', async () => {
      api.upVoteCommentAsync = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          vote: {
            id: 'vote-1',
            userId: 'users-1',
            commentId: 'comment-1',
            voteType: 1,
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'thread/upVoteComment/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(upVoteCommentAsync({
        threadId: 'thread-1',
        commentId: 'comment-1',
      }));
      expect(api.upVoteCommentAsync).toBeDefined();
    });

    test('Thunk downVoteCommentAsync', async () => {
      api.downVoteCommentAsync = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          vote: {
            id: 'vote-1',
            userId: 'users-1',
            commentId: 'comment-1',
            voteType: -1,
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'thread/downVoteComment/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(downVoteCommentAsync({
        threadId: 'thread-1',
        commentId: 'comment-1',
      }));
      expect(api.downVoteCommentAsync).toBeDefined();
    });

    test('Thunk upVoteThreadAsync', async () => {
      api.upVoteThreadAsync = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          vote: {
            id: 'vote-1',
            userId: 'users-1',
            threadId: 'thread-1',
            voteType: 1,
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'thread/upVote/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(upVoteThreadAsync({
        threadId: 'thread-1',
      }));
      expect(api.upVoteThreadAsync).toBeDefined();
    });

    test('Thunk downVoteThreadAsync', async () => {
      api.downVoteThreadAsync = () => Promise.resolve({
        status: 'success',
        message: 'ok',
        data: {
          vote: {
            id: 'vote-1',
            userId: 'users-1',
            threadId: 'thread-1',
            voteType: -1,
          },
        },
      });
      const localStore = configureStore({
        reducer: (state, action) => {
          if (action.type === 'thread/downVote/fulfilled') {
            return action.payload;
          }
          return state;
        },
      });

      await localStore.dispatch(downVoteThreadAsync({
        threadId: 'thread-1',
      }));
      expect(api.downVoteThreadAsync).toBeDefined();
    });
  });
});
