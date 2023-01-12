/* eslint-disable linebreak-style */
import userAPI from './userAPI';

describe('API Test', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  test('Fetch All', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
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
      }),
    }));
    const res = await userAPI.fetchAll();
    expect(res.data.users).toBeDefined();
  });

  test('Register', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        data: {
          user:
            {
              id: 'user-1',
              name: 'John Doe',
              email: 'johndoe@mail.com',
              avatar: 'https://generated-image-url.jpg',
            },
        },
      }),
    }));
    const res = await userAPI.register({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'adminaja',
    });
    expect(res.data.user).toBeDefined();
  });

  test('Login', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        data: {
          token: 'random token',
        },
      }),
    }));
    const res = await userAPI.login({
      email: 'johndoe@mail.com',
      password: 'adminaja',
    });
    expect(res.data.token).toBeDefined();
  });

  test('Detail', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        data: {
          user:
            {
              id: 'user-1',
              name: 'John Doe',
              email: 'johndoe@mail.com',
              avatar: 'https://generated-image-url.jpg',
            },
        },
      }),
    }));
    const res = await userAPI.detail({
      token: 'random token',
    });
    expect(res.data.user).toBeDefined();
  });
});
