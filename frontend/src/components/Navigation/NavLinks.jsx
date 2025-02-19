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
  const getLinkPosition = (index, total) => {
    // Reduced radius to keep items closer to center
    const radius = 80;
    // Adjust angle spread for tighter clustering
    const angleSpread = 100;
    const startAngle = -50;

    const angle = startAngle + (index / (total - 1)) * angleSpread;
    const angleInRadians = (angle * Math.PI) / 180;

    return {
      x: radius * Math.cos(angleInRadians),
      y: radius * Math.sin(angleInRadians),
    };
  };

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
    <Box position="fixed" right="32px" top="40px" zIndex={999}>
      {navLinks.map((link, index) => {
        const { x, y } = getLinkPosition(index, navLinks.length);

        return (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x,
              y,
            }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
            }}
            style={{
              position: 'absolute',
              zIndex: 1000,
              transformOrigin: 'center',
            }}
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink('default')}
          >
            {link.label === 'Shop' ? (
              <Box
                onMouseEnter={() => setIsShopHovered(true)}
                onMouseLeave={() => setIsShopHovered(false)}
                position="relative"
              >
                <RouterLink to={link.url} onClick={handleLinkClick}>
                  <Flex
                    bg="white"
                    color="#333333"
                    px="3"
                    py="1.5"
                    borderRadius="full"
                    alignItems="center"
                    gap="2"
                    boxShadow="md"
                    _hover={{ bg: 'yellow.100' }}
                    fontSize="sm"
                  >
                    {getIcon(link.label)}
                    <span>{link.label}</span>
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
              <Box onClick={handleBlogClick}>
                <Flex
                  bg="white"
                  color="#333333"
                  px="3"
                  py="1.5"
                  borderRadius="full"
                  alignItems="center"
                  gap="2"
                  boxShadow="md"
                  cursor="pointer"
                  _hover={{ bg: 'yellow.100' }}
                  fontSize="sm"
                >
                  {getIcon(link.label)}
                  <span>{link.label}</span>
                </Flex>
              </Box>
            ) : (
              <Box
                as={link.action ? 'button' : RouterLink}
                to={link.url}
                onClick={link.action || handleLinkClick}
              >
                <Flex
                  bg="white"
                  color="#333333"
                  px="3"
                  py="1.5"
                  borderRadius="full"
                  alignItems="center"
                  gap="2"
                  boxShadow="md"
                  _hover={{ bg: 'yellow.100' }}
                  fontSize="sm"
                >
                  {getIcon(link.label)}
                  <span>{link.label}</span>
                  {link.label === 'Cart' && cartItems?.length > 0 && (
                    <Badge
                      colorScheme="green"
                      borderRadius="full"
                      px="2"
                      fontSize="xs"
                    >
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Flex>
              </Box>
            )}
          </motion.div>
        );
      })}
    </Box>
  );
};

export default NavLinks;
