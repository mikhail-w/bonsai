// src/components/Navigation/ShopSubmenu.jsx
import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const ShopSubmenu = ({ submenuLinks, setIsShopHovered }) => {
  return (
    <Box
      position="absolute"
      top="100%"
      left="0"
      display="flex"
      gap="10px"
      bg="transparent"
      p="1rem"
      zIndex="1000"
      onMouseEnter={() => setIsShopHovered(true)}
      onMouseLeave={() => setIsShopHovered(false)}
    >
      {submenuLinks.map(submenuLink => (
        <Link
          key={submenuLink.label}
          as={RouterLink}
          to={submenuLink.url}
          fontSize="sm"
          bg="white"
          borderRadius="full"
          fontFamily="lato"
          color="#333333"
          display="flex"
          flexDirection="row"
          p="0.5rem 1rem"
          _hover={{ color: 'gray.800', bg: 'yellow' }}
        >
          {submenuLink.label}
        </Link>
      ))}
    </Box>
  );
};

export default ShopSubmenu;
