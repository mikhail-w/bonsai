import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Hamburger from 'hamburger-react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import { cleanMediaPath } from '../../utils/urlUtils';

const HamburgerMenu = ({
  isOpen,
  toggleMenu,
  hoveredLink,
  setHoveredLink,
  isCircleAnimationDone,
  userInfo,
}) => {
  const linkColors = {
    default: 'linear-gradient(179.1deg,#1D976C 2.3%,#93F9B9 98.3%)',
    Login:
      'radial-gradient(circle,  rgba(116, 214, 128, 0.8), rgba(55, 139, 41, 0.8))',
    Blog: 'radial-gradient(circle at 10% 20%, rgba(4, 159, 108, 0.8) 0%, rgba(194, 254, 113, 0.8) 90.1%)',
    Cart: 'radial-gradient(circle, rgba(11, 163, 96, 0.8), rgba(50, 205, 50, 0.8))',
    Shop: 'radial-gradient(circle,  rgba(63, 181, 63, 0.8) 2.3%, rgba(168, 251, 60, 0.9) 98.3%)',
    Logout:
      'radial-gradient(circle, rgba(63, 173, 141, 0.8), rgba(212, 242, 234, 0.8))',
  };

  return (
    <Box
      position="fixed"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="10"
      right={8}
      top={10}
    >
      {/* Animated Circle Background */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 15 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: isOpen
            ? linkColors[hoveredLink]
            : 'rgba(116, 214, 128, 1)',
          backdropFilter: 'blur(5px)',
          zIndex: 1,
        }}
      />

      {/* Hamburger Button */}
      <Box
        position="relative"
        width="50px"
        height="50px"
        borderRadius="full"
        bg="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
        zIndex={1001}
        _hover={{
          transform: 'scale(1.05)',
        }}
      >
        <Hamburger
          toggled={isOpen}
          toggle={toggleMenu}
          size={20}
          duration={0.3}
          color="#333333"
        />
      </Box>

      {/* User Avatar */}
      {userInfo && isOpen && isCircleAnimationDone && (
        <RouterLink to="/profile">
          <Avatar
            src={
              userInfo.avatar
                ? cleanMediaPath(
                    userInfo.avatar,
                    import.meta.env.VITE_API_BASE_URL
                  )
                : cleanMediaPath(
                    'default/avatar.jpg',
                    import.meta.env.VITE_API_BASE_URL
                  )
            }
            size="md"
            position="absolute"
            top="0"
            right="70px"
            zIndex={1001}
          />
        </RouterLink>
      )}
    </Box>
  );
};

export default HamburgerMenu;
