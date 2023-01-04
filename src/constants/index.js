/* eslint-disable linebreak-style */
import * as Yup from 'yup';

const BASE_URL = {
  API: 'https://forum-api.dicoding.dev/v1/',
  THREADS: 'threads',
  USERS: 'users',
  USER_DETAIL: 'users/me',

  //   Pages
  HOMEPAGE: '/',
  LEADERBOARD: 'leaderboard',
  LOGIN: '/login',
  REGISTER: '/register',
  THREAD_DETAIL: '/thread/:id',
};

const REGISTER_INITIAL_VALUE = {
  name: '',
  email: '',
  password: '',
  password_confirm: '',
};

const LOGIN_INITIAL_VALUE = {
  email: '',
  password: '',
};

const REGISTER_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Nama Terlalu Pendek')
    .max(50, 'Nama Terlalu Panjang')
    .required('Nama wajib diisi'),
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: Yup.string().required('Password wajib diisi'),
  password_confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password belum sama'),
});

const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: Yup.string().required('Password wajib diisi'),
});

export {
  BASE_URL, LOGIN_INITIAL_VALUE, LOGIN_SCHEMA, REGISTER_INITIAL_VALUE, REGISTER_SCHEMA,
};
