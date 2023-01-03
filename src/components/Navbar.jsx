import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { BASE_URL } from "constants";
import React from "react";
import { BiLogIn, BiPlus, BiRegistered, BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "states/users/userSlice";

const Navbar = () => {
  const users = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <nav>
      <Flex py={2} minWidth="max-content" gap="2">
        <Link to={BASE_URL.HOMEPAGE}>
          <Heading size="md">BERFORUM</Heading>
        </Link>
        <Spacer />
        {users && users.authenticated && (
          <>
            <Button leftIcon={<StarIcon />} onClick={() => navigate(BASE_URL.LEADERBOARD)}>Leaderboard</Button>
            <Button leftIcon={<BiPlus />}>Tambah Diskusi</Button>
            <Button leftIcon={<BiUserCircle />}>Udin Nganga</Button>
          </>
        )}
        {users && !users.authenticated && (
          <>
            <Button rightIcon={<BiLogIn />} onClick={() => navigate(BASE_URL.LOGIN)}>Masuk</Button>
            <Button rightIcon={<BiRegistered />} onClick={() => navigate(BASE_URL.REGISTER)}>Register</Button>
          </>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;
