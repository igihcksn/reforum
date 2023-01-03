import React from 'react';
import PropTypes from "prop-types";
import { Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
    return (
        <Container maxW="1200px" py={5}>
          {children}
        </Container>
    );
};

Layout.prototype = {
    children: PropTypes.node,
};
   
export default Layout;