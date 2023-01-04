/* eslint-disable linebreak-style */
import React from 'react';
import { Container } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Layout({ children }) {
  return (
    <Container maxW="1200px" py={5}>
      {children}
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
