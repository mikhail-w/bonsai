import { useEffect, useRef, useState } from 'react';
import Hamburger from 'hamburger-react';
import logo from '../assets/images/logo.png';
import logo_white from '../assets/images/logo_white.png';
import { cleanMediaPath } from '../utils/urlUtils';

import {
  Box,
  Flex,
  Link,
  Image,
  Badge,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher';
import { Link as ChakraLink, useBreakpointValue } from '@chakra-ui/react';
import { FaUser, FaBlog, FaShoppingCart, FaStore } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCircleAnimationDone, setIsCircleAnimationDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState('default');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toast = useToast();
  const menuRef = useRef(null);

  // Determine the logo to display based on current route and scroll position
  const logoSrc = pathname === '/' && !scrolled ? logo_white : logo;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleBlogClick = () => {
    setIsOpen(false);
    if (!userInfo) {
      navigate('/login'); // Redirect to login if user is not logged in
    } else {
      navigate('/blog'); // Otherwise, go to the blog page
    }
  };

  // Toggle menu function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsCircleAnimationDone(false); // Reset animation status
      setTimeout(() => {
        setIsCircleAnimationDone(true); // Set to true after the animation duration
      }, 800); // Same duration as the circle animation (0.8s)
    }
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Toggle menu function

  // Function to calculate positions with a 90-degree counterclockwise rotation and add margin
  const getLinkPosition = (index, total, radius) => {
    const angleOffset = Math.PI * 0.6; // 90-degree counterclockwise rotation
    const angle = angleOffset + (index / total) * (Math.PI * 0.5); // Spread links in a 90-degree arc
    const x = radius * Math.cos(angle); // X coordinate
    const y = radius * Math.sin(angle); // Y coordinate
    return { x, y };
  };

  // Handler for logout action
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    setIsOpen(false);
    navigate('/');
    toast({
      title: `User has Logged Out`,
      status: 'info', // still required for accessibility and behavior
      isClosable: true,
      duration: 3000,
      render: () => (
        <Box
          color="white" // Text color
          p={3}
          bg="linear-gradient(to right, rgba(255, 81, 47), rgba(221, 36, 118))" // Custom hex background color
          borderRadius="md"
          textAlign={'center'}
        >
          User is Logged Out
        </Box>
      ),
    });
  };

  // Array with both labels and their corresponding URLs
  const navLinks = [
    userInfo
      ? { label: 'Logout', action: logoutHandler, icon: FaUser }
      : { label: 'Login', url: '/login', icon: FaUser },
    { label: 'Blog', url: 'blog', icon: FaBlog },
    { label: 'Cart', url: '/cart', icon: FaShoppingCart },

    { label: 'Shop', url: '/products', icon: FaStore },
  ];

  const submenuLinks = [
    { label: 'Plants', url: '/plants' },
    { label: 'Planters', url: '/planters' },
    { label: 'Essentials', url: '/essentials' },
  ];

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const withoutSidebarRoutes = ['/profile', '/login', '/register'];
  if (withoutSidebarRoutes.some(item => pathname.includes(item))) return null;

  return (
    <Box ref={menuRef}>
      <Box>
        {/* Logo and Navigation Button (Hamburger/Close) */}
        <Flex>
          {/* Logo */}
          <RouterLink to="/">
            <Box position="fixed" top={9} left={8} zIndex="10">
              <Image src={logoSrc} alt="Logo" boxSize="50px" />
            </Box>
          </RouterLink>

          {/* Hamburger Button with Circle Animation */}
          <Box
            position="fixed"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="10"
            right={8}
            top={10}
          >
            {/* Radiating Circle */}
            <motion.div
              initial={{ scale: 0 }} // Initially scaled down
              animate={{ scale: isOpen ? 15 : 0 }} // Slightly reduced circle size
              transition={{ duration: 0.8, ease: 'easeInOut' }} // Smooth transition
              style={{
                position: 'absolute',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: isOpen
                  ? linkColors[hoveredLink]
                  : 'rgba(116, 214, 128, 1)',
                backdropFilter: 'blur(5px)',
                zIndex: 1, // Below the hamburger button
              }}
            />

            {/* Hamburger Button */}
            <Box
              width="50px"
              height="50px"
              borderRadius="full"
              bg="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="md"
              zIndex="2" // Ensures hamburger is above the circle
              transition="all 0.3s ease-in-out" // Add transition to default state
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
                toggled={isOpen} // Bind the open state to the Hamburger component
                toggle={toggleMenu} // Toggle function to switch between open and close
                rounded
                easing="ease-in"
                color="#333333"
                zIndex="2000"
              />
            </Box>
            {/* Avatar next to the close button when user is logged in */}
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
                  top="0px"
                  right="70px"
                  zIndex="5"
                />
              </RouterLink>
            )}

            {isOpen && isCircleAnimationDone && (
              <Box>
                {/* Navigation Links Positioned with 90-degree Counterclockwise Rotation */}
                {navLinks.map((link, index) => {
                  const { x, y } = getLinkPosition(index, navLinks.length, 320);

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0,
                        x: isOpen ? `${x}px` : '0px',
                        y: isOpen ? `${y}px` : '0px',
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
                      {/* For Shop link and its submenu */}
                      {link.label === 'Shop' ? (
                        <Box
                          onMouseEnter={() => setIsShopHovered(true)} // Show submenu when hovering over Shop link
                          onMouseLeave={() => setIsShopHovered(false)} // Hide submenu when leaving the Shop link or submenu
                          position="relative"
                        >
                          <RouterLink to={link.url} onClick={handleLinkClick}>
                            {/* Shop Link */}
                            <Flex
                              // as={RouterLink}
                              to={link.url}
                              fontFamily={'lato'}
                              color="#333333"
                              fontSize="xl"
                              _hover={{ color: 'gray.800', bg: 'yellow' }}
                              bg="white"
                              padding="0.5rem 1rem"
                              borderRadius="full"
                              boxShadow="md"
                              display="flex"
                              alignItems="center" // Align icon and text vertically
                              gap="0.5rem" // Add some space between the icon and the text
                            >
                              <link.icon />
                              Shop
                            </Flex>
                          </RouterLink>
                          {/* Submenu Links */}
                          {(isShopHovered || isMobile) && (
                            <Box
                              position="absolute"
                              top="100%" // Position below the Shop link
                              left="0"
                              display="flex" // Horizontally aligned
                              gap="10px" // Space between submenu items
                              bg="transparent" // Transparent background
                              padding="1rem"
                              // boxShadow="lg"
                              zIndex="1000"
                              onMouseEnter={() => setIsShopHovered(true)} // Keep submenu visible when hovering over it
                              onMouseLeave={() => setIsShopHovered(false)} // Hide submenu when leaving
                            >
                              {submenuLinks.map(submenuLink => (
                                <Link
                                  key={submenuLink.label}
                                  as={RouterLink}
                                  to={submenuLink.url}
                                  fontSize="sm"
                                  bg={'white'}
                                  borderRadius="full"
                                  fontFamily={'lato'}
                                  color="#333333"
                                  display="flex"
                                  flexDirection={'row'}
                                  padding="0.5rem 1rem"
                                  _hover={{ color: 'gray.800', bg: 'yellow' }}
                                  // borderRadius="md"
                                  // boxShadow="md"
                                >
                                  {submenuLink.label}
                                </Link>
                              ))}
                            </Box>
                          )}
                        </Box>
                      ) : link.label === 'Blog' ? (
                        // Handle Blog link click directly with handleBlogClick
                        <Flex
                          as="button"
                          onClick={handleBlogClick}
                          fontSize="xl"
                          fontFamily={'lato'}
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
                          <link.icon />
                          {link.label}
                        </Flex>
                      ) : link.action ? (
                        // If the link is a logout action, trigger the
                        <RouterLink to={link.url} onClick={handleLinkClick}>
                          <Flex
                            as="button"
                            onClick={link.action}
                            fontSize="xl"
                            fontFamily={'lato'}
                            color="#333333"
                            _hover={{ color: 'gray.800', bg: 'yellow' }}
                            bg="white"
                            padding="0.5rem 1rem"
                            borderRadius="full"
                            boxShadow="md"
                            display="flex"
                            alignItems="center" // Align icon and text vertically
                            gap="0.5rem" // Add some space between the icon and the text
                          >
                            {link.label}
                          </Flex>
                        </RouterLink>
                      ) : (
                        // Non-Shop links (e.g.,  Blog, Cart)
                        <RouterLink to={link.url} onClick={handleLinkClick}>
                          <Flex
                            // as={RouterLink}
                            to={link.url}
                            fontSize="xl"
                            fontFamily={'lato'}
                            color="#333333"
                            _hover={{ color: 'gray.800', bg: 'yellow' }}
                            bg="white"
                            padding="0.5rem 1rem"
                            borderRadius="full"
                            boxShadow="md"
                            display="flex"
                            alignItems="center" // Align icon and text vertically
                            gap="0.5rem" // Add some space between the icon and the text
                          >
                            <link.icon />
                            {link.label}
                            {link.label === 'Cart' && cartItems.length > 0 && (
                              <Badge
                                colorScheme="green"
                                borderRadius="full"
                                px={2}
                                ml={2}
                              >
                                {cartItems.reduce(
                                  (acc, item) => acc + item.qty,
                                  0
                                )}
                              </Badge>
                            )}
                          </Flex>
                        </RouterLink>
                      )}
                    </motion.div>
                  );
                })}
                {/* Search Bar added inside menu */}
                <Box
                  position="absolute"
                  width={200}
                  top={-10}
                  right={100}
                  display="flex"
                  alignItems="center"
                  mt="2rem"
                  zIndex={3000}
                >
                  <SearchBar />
                </Box>
                <Box
                  position="absolute"
                  width={200}
                  top={10}
                  right={-150}
                  display="flex"
                  alignItems="center"
                  mt="2rem"
                  zIndex={3000}
                >
                  <ColorModeSwitcher />
                </Box>
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navigation;
