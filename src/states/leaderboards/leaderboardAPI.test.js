/* eslint-disable linebreak-style */
import leaderboardAPI from './leaderboardApi';

jest.mock('./leaderboardApi', () => ({
  fetchAll: () => ({
    data: {
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
    },
  }),
}));

describe('API Test', () => {
  test('Fetch All', async () => {
    const res = await leaderboardAPI.fetchAll();
    expect(res.data).toBeDefined();
  });
});
