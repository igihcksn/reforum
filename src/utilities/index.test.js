/* eslint-disable linebreak-style */
import { generateDay, getAccessToken, getUserById, putAccessToken, showFormattedDate } from 'utilities';

describe('Utilities Test', () => {
  test('Generate Day', () => {
    const res = generateDay({ createdAt: '2023-01-11T13:06:06.573Z' });
    expect(res).toEqual(0);
  });
  test('Formatted Date', () => {
    const res = showFormattedDate('2023-01-11T13:06:06.573Z');
    expect(res).toEqual('Rabu, 11 Januari 2023');
  });
  test('Get User By ID, exist', () => {
    const res = getUserById({
      ownerId: 'user-1',
      users: {
        data: [
          {
            id: 'user-1',
            name: 'John Doe',
            email: 'johndoe@mail.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    });
    expect(res).toEqual('John Doe');
  });
  test('Get User By ID, not exist', () => {
    const res = getUserById({
      ownerId: 'user-1',
      users: [
        {
          id: 'user-2',
          name: 'John Doe',
          email: 'johndoe@mail.com',
          avatar: 'https://generated-image-url.jpg',
        },
      ],
    });
    expect(res).toBe(null);
  });
  test('Get Access Token', () => {
    expect(getAccessToken()).toBeNull();
  });
  test('Put Access Token', () => {
    const res = putAccessToken('randomToken');
    expect(res).not.toBeDefined();
  });
});
