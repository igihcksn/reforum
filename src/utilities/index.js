/* eslint-disable linebreak-style */
import store from './store';
import theme from './theme';

const generateDay = ({ createdAt }) => {
  const now = new Date();
  const itemDate = new Date(createdAt);
  return parseInt((now - itemDate) / (1000 * 60 * 60 * 24), 10);
};

const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const getUserById = ({ ownerId, users }) => {
  if (users.data) {
    const res = users.data.filter((user) => user.id === ownerId);
    return res[0].name;
  }

  return null;
};

const getAccessToken = () => localStorage.getItem('accessToken');

const putAccessToken = (accessToken) => localStorage.setItem('accessToken', accessToken);

export {
  getAccessToken,
  generateDay,
  getUserById,
  putAccessToken,
  showFormattedDate,
  store,
  theme,
};
