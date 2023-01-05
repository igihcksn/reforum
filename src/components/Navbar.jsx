/* eslint-disable linebreak-style */
import { StarIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { BASE_URL } from 'constants';
import React, { useEffect } from 'react';
import {
  BiLogIn, BiPlus, BiRegistered, BiUserCircle,
} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  detailUserAsync, selectUser, setRefreshAuthorizedUser, setUnAuthorizedUser,
} from 'states/users/userSlice';
import { getAccessToken } from 'utilities';

function Navbar() {
  const users = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getAccessToken();

  const setLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(setUnAuthorizedUser());
    navigate(BASE_URL.LOGIN);
  };

  useEffect(() => {
    if (!token) {
      dispatch(setUnAuthorizedUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(setRefreshAuthorizedUser());
      dispatch(detailUserAsync());
    }
  }, [dispatch, token]);

  return (
    <nav>
      <Flex py={2} minWidth="max-content" gap="2">
        <Link to={BASE_URL.HOMEPAGE}>
          <Heading size="md">BERFORUM</Heading>
        </Link>
        <Spacer />
        {users && users.authenticated && (
          <>
            <Button
              leftIcon={<StarIcon />}
              onClick={() => navigate(BASE_URL.LEADERBOARD)}
            >
              Leaderboard
            </Button>
            <Button leftIcon={<BiPlus />}>Tambah Diskusi</Button>
            <Button
              leftIcon={<BiUserCircle />}
              onClick={() => setLogout()}
            >
              {users.detail && users.detail.name}

            </Button>
          </>
        )}
        {users && !users.authenticated && (
          <>
            <Button rightIcon={<BiLogIn />} onClick={() => navigate(BASE_URL.LOGIN)}>Masuk</Button>
            <Button
              rightIcon={<BiRegistered />}
              onClick={() => navigate(BASE_URL.REGISTER)}
            >
              Register

            </Button>
          </>
        )}
      </Flex>
    </nav>
  );
}

export default Navbar;
