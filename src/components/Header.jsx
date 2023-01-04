/* eslint-disable linebreak-style */
import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

function Header() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      py={12}
      bgImage="url('https://bit.ly/2Z4KKcF')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      mb={2}
      as="header"
    >
      <Heading as="h1" noOfLines={1}>
        Berforum Bersama dan Berkarya Ceria
      </Heading>
    </Box>
  );
}

export default Header;
