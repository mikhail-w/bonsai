import { Box } from '@chakra-ui/react';
import Hamburger from 'hamburger-react';

const MenuButton = ({ isOpen, toggleMenu }) => {
  return (
    <Box
      width="50px"
      height="50px"
      borderRadius="full"
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="md"
      zIndex="2"
      transition="all 0.3s ease-in-out"
      userSelect="none"
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        touchAction: 'none',
      }}
      _hover={{
        transform: 'scale(1.09)',
        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.2)',
      }}
    >
      <Hamburger
        toggled={isOpen}
        toggle={toggleMenu}
        direction="right"
        rounded
        size={25}
        easing="ease-in"
        color="#333333"
        zIndex="2000"
      />
    </Box>
  );
};

export default MenuButton;
