// src/components/Navigation/Navigation.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { logout } from '../../actions/userActions';
import { clearCart } from '../../actions/cartActions';

import Logo from './Logo';
import HamburgerMenu from './HamburgerMenu';
import NavLinks from './NavLinks';
import SearchBar from '../SearchBar';
import ColorModeSwitcher from '../ColorModeSwitcher';

// Import images
import logo from '../../assets/images/logo.png';
import logo_white from '../../assets/images/logo_white.png';

const Navigation = () => {
  // Local state
  const [isOpen, setIsOpen] = useState(false);
  const [isCircleAnimationDone, setIsCircleAnimationDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState('default');
  const menuRef = useRef(null);

  // Redux & router hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toast = useToast();

  // Redux state
  const { userInfo } = useSelector(state => state.userLogin);
  const { cartItems } = useSelector(state => state.cart);

  // Choose the logo based on scroll and route
  const logoSrc = pathname === '/' && !scrolled ? logo_white : logo;

  // Toggle the menu and handle the circle animation timing
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setIsCircleAnimationDone(false);
      setTimeout(() => setIsCircleAnimationDone(true), 800);
    }
  };

  // Click handlers
  const handleLinkClick = () => setIsOpen(false);

  const handleBlogClick = () => {
    setIsOpen(false);
    if (!userInfo) {
      navigate('/login');
    } else {
      navigate('/blog');
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    setIsOpen(false);
    navigate('/');
    toast({
      title: `User has Logged Out`,
      status: 'info',
      isClosable: true,
      duration: 3000,
      render: () => (
        <Box
          color="white"
          p={3}
          bg="linear-gradient(to right, rgba(255, 81, 47), rgba(221, 36, 118))"
          borderRadius="md"
          textAlign="center"
        >
          User is Logged Out
        </Box>
      ),
    });
  };

  // Navigation links definition (the icons will be rendered in NavLinks)
  const navLinks = [
    userInfo
      ? { label: 'Logout', action: logoutHandler }
      : { label: 'Login', url: '/login' },
    { label: 'Blog', url: '/blog' },
    { label: 'Cart', url: '/cart' },
    { label: 'Shop', url: '/products' },
  ];

  // Submenu items for the Shop link
  const submenuLinks = [
    { label: 'Plants', url: '/plants' },
    { label: 'Planters', url: '/planters' },
    { label: 'Essentials', url: '/essentials' },
  ];

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Update “scrolled” state based on window scroll position
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optionally hide the navigation on certain routes
  const withoutSidebarRoutes = ['/profile', '/login', '/register'];
  if (withoutSidebarRoutes.some(item => pathname.includes(item))) return null;

  return (
    <Box ref={menuRef}>
      <Flex>
        <Logo logoSrc={logoSrc} />
        <HamburgerMenu
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          hoveredLink={hoveredLink}
          setHoveredLink={setHoveredLink}
          isCircleAnimationDone={isCircleAnimationDone}
          userInfo={userInfo}
        />
        {isOpen && isCircleAnimationDone && (
          <NavLinks
            navLinks={navLinks}
            submenuLinks={submenuLinks}
            handleLinkClick={handleLinkClick}
            handleBlogClick={handleBlogClick}
            cartItems={cartItems}
            isShopHovered={isShopHovered}
            setIsShopHovered={setIsShopHovered}
            setHoveredLink={setHoveredLink}
          />
        )}
        {isOpen && isCircleAnimationDone && (
          <>
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
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navigation;
