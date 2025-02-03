// src/components/Navigation/NavLinks.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Flex, Badge } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaUser, FaBlog, FaShoppingCart, FaStore } from 'react-icons/fa';
import ShopSubmenu from './ShopSubmenu';

const NavLinks = ({
  navLinks,
  submenuLinks,
  handleLinkClick,
  handleBlogClick,
  cartItems,
  isShopHovered,
  setIsShopHovered,
  setHoveredLink,
}) => {
  // Helper to compute positions in an arc
  const getLinkPosition = (index, total, radius) => {
    const angleOffset = Math.PI * 0.6; // Offset angle
    const angle = angleOffset + (index / total) * (Math.PI * 0.5); // Spread over a 90° arc
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  // Return the appropriate icon based on label
  const getIcon = label => {
    switch (label) {
      case 'Shop':
        return <FaStore />;
      case 'Blog':
        return <FaBlog />;
      case 'Cart':
        return <FaShoppingCart />;
      default:
        return <FaUser />;
    }
  };

  return (
    <Box>
      {navLinks.map((link, index) => {
        const { x, y } = getLinkPosition(index, navLinks.length, 320);
        return (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: `${x}px`,
              y: `${y}px`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '8px',
            }}
            onMouseEnter={() => setHoveredLink(link.label)}
          >
            {link.label === 'Shop' ? (
              <Box
                onMouseEnter={() => setIsShopHovered(true)}
                onMouseLeave={() => setIsShopHovered(false)}
                position="relative"
              >
                <RouterLink to={link.url} onClick={handleLinkClick}>
                  <Flex
                    fontFamily="lato"
                    color="#333333"
                    fontSize="xl"
                    _hover={{ color: 'gray.800', bg: 'yellow' }}
                    bg="white"
                    p="0.5rem 1rem"
                    borderRadius="full"
                    boxShadow="md"
                    display="flex"
                    alignItems="center"
                    gap="0.5rem"
                  >
                    {getIcon(link.label)}
                    {link.label}
                  </Flex>
                </RouterLink>
                {isShopHovered && (
                  <ShopSubmenu
                    submenuLinks={submenuLinks}
                    setIsShopHovered={setIsShopHovered}
                  />
                )}
              </Box>
            ) : link.label === 'Blog' ? (
              <Flex
                as="button"
                onClick={handleBlogClick}
                fontSize="xl"
                fontFamily="lato"
                color="#333333"
                _hover={{ color: 'gray.800', bg: 'yellow' }}
                bg="white"
                p="0.5rem 1rem"
                borderRadius="full"
                boxShadow="md"
                display="flex"
                alignItems="center"
                gap="0.5rem"
              >
                {getIcon(link.label)}
                {link.label}
              </Flex>
            ) : link.action ? (
              <RouterLink to={link.url || '#'} onClick={handleLinkClick}>
                <Flex
                  as="button"
                  onClick={link.action}
                  fontSize="xl"
                  fontFamily="lato"
                  color="#333333"
                  _hover={{ color: 'gray.800', bg: 'yellow' }}
                  bg="white"
                  p="0.5rem 1rem"
                  borderRadius="full"
                  boxShadow="md"
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  {getIcon(link.label)}
                  {link.label}
                </Flex>
              </RouterLink>
            ) : (
              <RouterLink to={link.url} onClick={handleLinkClick}>
                <Flex
                  fontSize="xl"
                  fontFamily="lato"
                  color="#333333"
                  _hover={{ color: 'gray.800', bg: 'yellow' }}
                  bg="white"
                  p="0.5rem 1rem"
                  borderRadius="full"
                  boxShadow="md"
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  {getIcon(link.label)}
                  {link.label}
                  {link.label === 'Cart' &&
                    cartItems &&
                    cartItems.length > 0 && (
                      <Badge
                        colorScheme="green"
                        borderRadius="full"
                        px={2}
                        ml={2}
                      >
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </Badge>
                    )}
                </Flex>
              </RouterLink>
            )}
          </motion.div>
        );
      })}
    </Box>
  );
};

export default NavLinks;
