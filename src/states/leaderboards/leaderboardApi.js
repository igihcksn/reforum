/* eslint-disable linebreak-style */

const leaderboardAPI = {
  async fetchAll() {
    const result = await fetch('https://forum-api.dicoding.dev/v1/leaderboards');
    return result.json();
  },
};

export default leaderboardAPI;
