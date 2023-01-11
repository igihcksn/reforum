/* eslint-disable linebreak-style */

const userAPI = {
  async fetchAll() {
    const result = await fetch('https://forum-api.dicoding.dev/v1/users');
    return result.json();
  },

  async register({ name, email, password }) {
    const result = await fetch('https://forum-api.dicoding.dev/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return result.json();
  },

  async login({ email, password }) {
    const result = await fetch('https://forum-api.dicoding.dev/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return result.json();
  },

  async detail() {
    const result = await fetch('https://forum-api.dicoding.dev/v1/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return result.json();
  },
};

export default userAPI;
