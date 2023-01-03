import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { BASE_URL } from "constants";
import React from "react";
import { BiLogIn, BiLogOut, BiRegistered } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "states/users/userSlice";

const Navbar = () => {
  const users = useSelector(selectUser);

  return (
    <nav>
      <Flex px={3} py={2} minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Link to={BASE_URL.HOMEPAGE}>
            <Heading size="md">BERFORUM</Heading>
          </Link>
        </Box>
        <Spacer />
        {users && users.authenticated && (
          <>
            <Button leftIcon={<StarIcon />}>Leaderboard</Button>
            <Avatar name="Oshigaki Kisame">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
              <Button leftIcon={<BiLogOut />}>Keluar</Button>
            </Avatar>
          </>
        )}
        {users && !users.authenticated && (
          <>
            <Link to={BASE_URL.LOGIN}>
              <BiLogIn /> Masuk
            </Link>
            <Link to={BASE_URL.REGISTER}>
              Daftar <BiRegistered />
            </Link>
          </>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;
