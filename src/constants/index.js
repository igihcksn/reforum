/* eslint-disable linebreak-style */
import * as Yup from 'yup';

const BASE_URL = {
  API: 'https://forum-api.dicoding.dev/v1/',
  THREADS: 'threads',
  THREADS_COMMETS: 'threads/:id/comments',
  USERS: 'users',
  USER_DETAIL: 'users/me',

  //   Pages
  HOMEPAGE: '/thread',
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

const THREAD_INITIAL_VALUE = {
  title: '',
  body: '',
  category: '',
};

const COMMENT_INITIAL_VALUE = {
  content: '',
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

const COMMENT_SCHEMA = Yup.object().shape({
  content: Yup.string().required('Komentar wajib diisi'),
});

const THREAD_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Judul Terlalu Pendek')
    .max(50, 'Judul Terlalu Panjang')
    .required('Judul wajib diisi'),
  body: Yup.string()
    .min(2, 'Konten Terlalu Pendek')
    .max(250, 'Konten Terlalu Panjang')
    .required('Konten wajib diisi'),
  category: Yup.string()
    .min(2, 'Kategori Terlalu Pendek')
    .max(50, 'Kategori Terlalu Panjang')
    .required('Kategori wajib diisi'),
});

export {
  BASE_URL,
  COMMENT_INITIAL_VALUE,
  COMMENT_SCHEMA,
  LOGIN_INITIAL_VALUE,
  LOGIN_SCHEMA,
  REGISTER_INITIAL_VALUE,
  REGISTER_SCHEMA,
  THREAD_INITIAL_VALUE,
  THREAD_SCHEMA,
};
