/* eslint-disable linebreak-style */
import { StarIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Hide,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Spacer,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BASE_URL } from 'constants';
import React, { useEffect, useRef } from 'react';
import {
  BiLogIn, BiMenu, BiPlus, BiRegistered, BiUserCircle,
} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  detailUserAsync, selectUser, setRefreshAuthorizedUser, setUnAuthorizedUser,
} from 'states/users/userSlice';
import { getAccessToken } from 'utilities';
import ThreadModalInput from './ThreadModalInput';

function Navbar() {
  const users = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getAccessToken();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  const setLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(setUnAuthorizedUser());
    navigate(BASE_URL.LOGIN);
  };

  useEffect(() => {
    if (!token) {
      dispatch(setUnAuthorizedUser());
    }
    if (token) {
      dispatch(setRefreshAuthorizedUser());
      dispatch(detailUserAsync());
    }
  }, [token]);

  useEffect(() => {
    if (users.expired) {
      toast({
        title: 'Upss ada masalah...',
        description: 'Sepertinya sesi kamu habis, silahkan lakukan login kembali untuk dapat menambahkan diskusi',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      dispatch(setUnAuthorizedUser());
      localStorage.removeItem('accessToken');
      navigate(BASE_URL.LOGIN);
    }
  }, [users]);

  return (
    <nav>
      <Flex py={2} minWidth="max-content" gap="2">
        <Link to={BASE_URL.HOMEPAGE}>
          <Heading size="md">BERFORUM</Heading>
        </Link>
        <Spacer />
        {users && users.authenticated && (
          <>
            <Hide below="md">
              <Button
                leftIcon={<StarIcon />}
                onClick={() => navigate(BASE_URL.LEADERBOARD)}
              >
                Leaderboard
              </Button>
              <Button leftIcon={<BiPlus />} onClick={onOpen}>Tambah Diskusi</Button>
              <Button
                leftIcon={<BiUserCircle />}
                onClick={() => setLogout()}
              >
                {users.detail && users.detail.name}

              </Button>
            </Hide>
            <Show below="md">
              <Menu>
                <MenuButton as={Button} rightIcon={<BiMenu />}>
                  Menu
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate(BASE_URL.LEADERBOARD)}>
                    Leaderboard
                  </MenuItem>
                  <MenuItem leftIcon={<BiPlus />} onClick={onOpen}>Tambah Diskusi</MenuItem>
                  <MenuItem onClick={() => setLogout()}>
                    {users.detail && users.detail.name}

                  </MenuItem>
                </MenuList>
              </Menu>
            </Show>
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
      <ThreadModalInput
        initialRef={initialRef}
        finalRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      />
    </nav>
  );
}

export default Navbar;
