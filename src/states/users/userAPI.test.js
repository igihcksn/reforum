/* eslint-disable linebreak-style */
import userAPI from './userAPI';

jest.mock('./userAPI', () => ({
  fetchAll: () => ({
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
  register: ({ name, email }) => ({
    data: {
      user:
        {
          id: 'user-1',
          name,
          email,
          avatar: 'https://generated-image-url.jpg',
        },
    },
  }),
}));

describe('API Test', () => {
  test('Fetch All', async () => {
    const res = await userAPI.fetchAll();
    expect(res.data.users).toBeDefined();
  });
  test('Register', async () => {
    const res = await userAPI.register({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'adminaja',
    });
    expect(res.data.user).toBeDefined();
  });
});
