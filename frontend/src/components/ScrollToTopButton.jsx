import { useState, useEffect } from 'react';
import { Box, useMediaQuery, keyframes } from '@chakra-ui/react';
import scrollToTopImage from '../assets/images/leaf1.png';

// Floating animation for desktop hover effect
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Briefly hide overlay effect on mobile press
    if (isMobile) {
      setPressed(true);
      setTimeout(() => setPressed(false), 200);
    }
  };

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      width="50px"
      height="100px"
      bgImage={`url(${scrollToTopImage})`}
      bgSize="contain"
      bgPosition="center"
      bgRepeat="no-repeat"
      cursor="pointer"
      display={showButton ? 'block' : 'none'}
      transition="opacity 0.3s ease-in-out"
      opacity={pressed ? 0 : 0.5}
      zIndex={1000}
      _hover={{
        opacity: 0.9,
        animation: !isMobile ? `${float} 1.5s ease-in-out infinite` : 'none',
      }}
      _active={{ opacity: isMobile ? 0 : 0.9 }}
      onClick={scrollToTop}
      sx={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
        userSelect: 'none',
      }}
    />
  );
};

export default ScrollToTopButton;
