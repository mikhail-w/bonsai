import { Box, Flex, Badge, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaUser, FaBlog, FaShoppingCart, FaStore } from 'react-icons/fa';

const iconMap = {
  Login: FaUser,
  Logout: FaUser,
  Blog: FaBlog,
  Cart: FaShoppingCart,
  Shop: FaStore,
};

const NavigationLink = ({
  link,
  cartItems,
  handleLinkClick,
  handleBlogClick,
  isShopHovered,
  setIsShopHovered,
  isMobile,
  submenuLinks,
}) => {
  const Icon = iconMap[link.label];

  if (link.label === 'Shop') {
    return (
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
            padding="0.5rem 1rem"
            borderRadius="full"
            boxShadow="md"
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            {Icon && <Icon />}
            Shop
          </Flex>
        </RouterLink>

        {/* Submenu */}
        {(isShopHovered || isMobile) && (
          <Box
            position="absolute"
            top="100%"
            left="0"
            display="flex"
            gap="10px"
            bg="transparent"
            padding="1rem"
            zIndex="1000"
            onMouseEnter={() => setIsShopHovered(true)}
            onMouseLeave={() => setIsShopHovered(false)}
          >
            {submenuLinks.map(submenuLink => (
              <Link
                key={submenuLink.label}
                as={RouterLink}
                to={submenuLink.url}
                onClick={handleLinkClick}
                fontSize="sm"
                bg="white"
                borderRadius="full"
                fontFamily="lato"
                color="#333333"
                display="flex"
                flexDirection="row"
                padding="0.5rem 1rem"
                _hover={{ color: 'gray.800', bg: 'yellow' }}
              >
                {submenuLink.label}
              </Link>
            ))}
          </Box>
        )}
      </Box>
    );
  }

  if (link.label === 'Blog') {
    return (
      <Flex
        as="button"
        onClick={handleBlogClick}
        fontSize="xl"
        fontFamily="lato"
        color="#333333"
        _hover={{ color: 'gray.800', bg: 'yellow' }}
        bg="white"
        padding="0.5rem 1rem"
        borderRadius="full"
        boxShadow="md"
        display="flex"
        alignItems="center"
        gap="0.5rem"
      >
        {Icon && <Icon />}
        {link.label}
      </Flex>
    );
  }

  return (
    <RouterLink to={link.url} onClick={link.action || handleLinkClick}>
      <Flex
        fontSize="xl"
        fontFamily="lato"
        color="#333333"
        _hover={{ color: 'gray.800', bg: 'yellow' }}
        bg="white"
        padding="0.5rem 1rem"
        borderRadius="full"
        boxShadow="md"
        display="flex"
        alignItems="center"
        gap="0.5rem"
      >
        {Icon && <Icon />}
        {link.label}
        {link.label === 'Cart' && cartItems?.length > 0 && (
          <Badge colorScheme="green" borderRadius="full" px={2} ml={2}>
            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
          </Badge>
        )}
      </Flex>
    </RouterLink>
  );
};

export default NavigationLink;
