import React from 'react';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';

function Navbar() {
  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex alignItems="center">
        <Heading size="md" color="white">Grocery Store App</Heading>
        <Spacer />
        {/* Add more navbar items here if needed */}
      </Flex>
    </Box>
  );
}

export default Navbar;