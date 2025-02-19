import { useEffect, useRef, useState } from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@chakra-ui/react';
import { logout } from '../../actions/userActions';
import { clearCart } from '../../actions/cartActions';
import { getLinkPosition } from './navigationUtils';

import Logo from './Logo';
import MenuButton from './MenuButton';
import UserAvatar from './UserAvatar';
import NavigationCircle from './NavigationCircle';
import ShopSubmenu from './ShopSubmenu';
import NavigationLink from './NavigationLink';
import SearchBar from './SearchBar';
import ColorModeSwitcher from '../ColorModeSwitcher';

const Navigation = () => {
  // Local state
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isOpen, setIsOpen] = useState(false);
  const [isCircleAnimationDone, setIsCircleAnimationDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState('default');
  const menuRef = useRef(null);
  const location = useLocation();

  // Redux & router hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toast = useToast();

  // Redux state
  const { userInfo } = useSelector(state => state.userLogin);
  const { cartItems } = useSelector(state => state.cart);

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

  // Reset menu state when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsCircleAnimationDone(false);
    setIsShopHovered(false);
    setHoveredLink('default');
  }, [location.pathname]);

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
      <Box>
        <Flex>
          <Logo pathname={pathname} scrolled={scrolled} />

          <Box
            position="fixed"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="10"
            right={8}
            top={10}
          >
            <NavigationCircle isOpen={isOpen} hoveredLink={hoveredLink} />
            <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />

            {userInfo && isOpen && isCircleAnimationDone && (
              <UserAvatar userInfo={userInfo} />
            )}

            {isOpen && isCircleAnimationDone && (
              <Box>
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
                      <NavigationLink
                        link={link}
                        cartItems={cartItems}
                        handleLinkClick={handleLinkClick}
                        handleBlogClick={handleBlogClick}
                        isShopHovered={isShopHovered}
                        setIsShopHovered={setIsShopHovered}
                        isMobile={isMobile}
                        submenuLinks={submenuLinks}
                      />
                      {link.label === 'Shop' && (
                        <ShopSubmenu
                          isShopHovered={isShopHovered}
                          setIsShopHovered={setIsShopHovered}
                          isMobile={isMobile}
                          submenuLinks={submenuLinks}
                          handleLinkClick={handleLinkClick}
                        />
                      )}
                    </motion.div>
                  );
                })}

                <Box
                  position="absolute"
                  width={200}
                  top={-10}
                  right={160}
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
