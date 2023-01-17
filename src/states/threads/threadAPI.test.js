/* eslint-disable linebreak-style */
import threadAPI from './threadAPI';

describe('Thread API Test', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  test('Fetch All', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
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
      }),
    }));
    const res = await threadAPI.fetchAll();
    expect(res.data.threads).toBeDefined();
  });

  test('Fetch Detail', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
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
      }),
    }));
    const res = await threadAPI.detailThread('thread-1');
    expect(res.data.detailThread).toBeDefined();
  });

  test('Create Thread', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
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
      }),
    }));
    const res = await threadAPI.createThread({
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
    });
    expect(res.data.thread).toBeDefined();
  });

  test('Create Comment', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
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
      }),
    }));
    const res = await threadAPI.createComment({
      threadId: 'comment-1',
      content: 'Ini adalah komentar pertama',
    });
    expect(res.data.comment).toBeDefined();
  });

  test('Up Vote Comment', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        data: {
          vote: {
            id: 'vote-1',
            userId: 'users-1',
            commentId: 'comment-1',
            voteType: 1,
          },
        },
      }),
    }));
    const res = await threadAPI.upVoteComment({
      threadId: 'thread-1',
      commentId: 'comment-1',
    });
    expect(res.data.vote.voteType).toEqual(1);
  });

  test('Down Vote Comment', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        data: {
          vote: {
            id: 'vote-1',
            userId: 'users-1',
            commentId: 'comment-1',
            voteType: -1,
          },
        },
      }),
    }));
    const res = await threadAPI.downVoteComment({
      threadId: 'thread-1',
      commentId: 'comment-1',
    });
    expect(res.data.vote.voteType).toEqual(-1);
  });

  test('Up Vote Thread', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        data: {
          vote: {
            id: 'vote-1',
            userId: 'users-1',
            threadId: 'thread-1',
            voteType: 1,
          },
        },
      }),
    }));
    const res = await threadAPI.upVoteTheread({
      threadId: 'thread-1',
    });
    expect(res.data.vote.voteType).toEqual(1);
  });

  test('Up Vote Thread', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        data: {
          vote: {
            id: 'vote-1',
            userId: 'users-1',
            threadId: 'thread-1',
            voteType: 1,
          },
        },
      }),
    }));
    const res = await threadAPI.upVoteTheread({
      threadId: 'thread-1',
    });
    expect(res.data.vote.voteType).toEqual(1);
  });

  test('Down Vote Thread', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        data: {
          vote: {
            id: 'vote-1',
            userId: 'users-1',
            threadId: 'thread-1',
            voteType: -1,
          },
        },
      }),
    }));
    const res = await threadAPI.downVoteTheread({
      threadId: 'thread-1',
    });
    expect(res.data.vote.voteType).toEqual(-1);
  });
});
