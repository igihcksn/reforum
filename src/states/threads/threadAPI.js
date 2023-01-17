/* eslint-disable linebreak-style */
const threadAPI = {
  async fetchAll() {
    const result = await fetch('https://forum-api.dicoding.dev/v1/threads');
    return result.json();
  },

  async detailThread(threadId) {
    const result = await fetch(`https://forum-api.dicoding.dev/v1/threads/${threadId}`);
    return result.json();
  },

  async createThread({ title, body, category }) {
    const result = await fetch('https://forum-api.dicoding.dev/v1/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ title, body, category }),
    });
    return result.json();
  },

  async createComment({ content, threadId }) {
    const result = await fetch(`https://forum-api.dicoding.dev/v1/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ content }),
    });
    return result.json();
  },

  async upVoteComment({ threadId, commentId }) {
    const result = await fetch(`https://forum-api.dicoding.dev/v1/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return result.json();
  },

  async downVoteComment({ threadId, commentId }) {
    const result = await fetch(`https://forum-api.dicoding.dev/v1/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return result.json();
  },

  async upVoteTheread({ threadId }) {
    const result = await fetch(`https://forum-api.dicoding.dev/v1/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return result.json();
  },

  async downVoteTheread({ threadId }) {
    const result = await fetch(`https://forum-api.dicoding.dev/v1/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return result.json();
  },
};

export default threadAPI;
