import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionRect = motion.rect;

const YinYang = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const textColor = useColorModeValue('gray.800', 'gray.200');

  const defaultParagraph =
    'Discover the art where patience and nature blend harmoniously. Explore our journey into tranquility and craftsmanship.';

  const firstParagraph =
    'Our collection features meticulously crafted bonsais for every level of enthusiast, from beginners to seasoned artists. We also offer high-quality tools, pots, and guides to help you nurture your miniature masterpiece.';

  const secondParagraph =
    "Whether you're seeking to bring tranquility to your home or searching for the perfect gift, We are your destination for all things bonsai. Explore our shop, dive into our care guides, and join a community of bonsai lovers worldwide.";

  const handleInteraction = section => {
    if (isMobile) {
      // Ensure tapping one side activates it and deactivates the other
      setActiveSection(prev => (prev === section ? null : section));
    } else {
      setActiveSection(section);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveSection(null);
    }
  };

  return (
    <VStack spacing={8} mt={-4} mb={12} align="center">
      {/* Instruction Text */}
      <Text
        mt={6}
        fontSize={{ base: 'lg', md: 'xl' }}
        color={textColor}
        textAlign="center"
        opacity={0.7}
      >
        {isMobile
          ? 'Tap the symbol to learn about us'
          : 'Hover over the symbol to learn about us'}
      </Text>

      {/* Yin-Yang Symbol */}
      <Box
        position="relative"
        width="200px"
        height="200px"
        sx={{
          svg: {
            WebkitTapHighlightColor: 'transparent',
          },
          'svg path, svg circle': {
            outline: 'none',
          },
        }}
      >
        <svg viewBox="0 0 240 240" width="100%" height="100%">
          <defs>
            {/* Gradient Colors */}
            <linearGradient
              id="hoverBlackGradient"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(50, 205, 50, 0.8)" />
              <stop offset="100%" stopColor="rgba(11, 163, 96, 0.8)" />
            </linearGradient>

            <linearGradient
              id="hoverWhiteGradient"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="2.3%" stopColor="rgba(168, 251, 60, 0.9)" />
              <stop offset="98.3%" stopColor="rgb(56, 172, 70)" />
            </linearGradient>

            {/* Masks for Animation */}
            <mask id="blackFillMask">
              <rect width="240" height="240" fill="black" />
              <MotionRect
                width="240"
                height="240"
                fill="white"
                animate={{ y: activeSection === 'black' ? 0 : 240 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </mask>

            <mask id="whiteFillMask">
              <rect width="240" height="240" fill="black" />
              <MotionRect
                width="240"
                height="240"
                fill="white"
                animate={{ y: activeSection === 'white' ? 0 : 240 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </mask>
          </defs>

          {/* Base Circle */}
          <circle
            cx="120"
            cy="120"
            r="115"
            fill="#ffffff92"
            stroke="black"
            strokeWidth="1"
          />

          {/* Green Half */}
          <path
            d="M120 5 A115 115 0 0 1 120 235 A57.5 57.5 0 0 1 120 120 A57.5 57.5 0 0 0 120 5Z"
            fill="url(#hoverBlackGradient)"
            mask="url(#blackFillMask)"
            cursor="pointer"
            onMouseEnter={() => handleInteraction('black')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('black')}
          />

          {/* White Half */}
          <path
            d="M120 235 A115 115 0 0 1 120 5 A57.5 57.5 0 0 1 120 120 A57.5 57.5 0 0 0 120 235Z"
            fill="url(#hoverWhiteGradient)"
            mask="url(#whiteFillMask)"
            cursor="pointer"
            onMouseEnter={() => handleInteraction('white')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('white')}
          />

          {/* Dots */}
          <circle
            cx="120"
            cy="62.5"
            r="12"
            cursor="pointer"
            onMouseEnter={() => handleInteraction('white')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('white')}
            fill={
              activeSection === 'black'
                ? '#28b485'
                : activeSection
                ? 'white'
                : 'transparent'
            }
            transition="fill 0.3s ease-in-out"
          />
          <circle
            cx="120"
            cy="177.5"
            r="12"
            cursor="pointer"
            onMouseEnter={() => handleInteraction('black')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('black')}
            fill={
              activeSection === 'white'
                ? 'rgba(50, 205, 50, 0.8)'
                : activeSection
                ? 'white'
                : 'transparent'
            }
            transition="fill 0.3s ease-in-out"
          />
        </svg>
      </Box>

      {/* Smoothly Transitioning Text Container */}
      <Box
        mt={6}
        width="100%"
        maxW={{ base: '90%', md: 'container.lg' }}
        px={4}
        position="relative"
        minH="150px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection || 'default'}
            initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ position: 'absolute', width: '100%' }}
          >
            <Text
              fontFamily={'lato'}
              fontWeight={300}
              fontSize={{ base: 'lg', md: '3xl' }}
              color={textColor}
              textAlign="center"
            >
              {activeSection === 'black'
                ? firstParagraph
                : activeSection === 'white'
                ? secondParagraph
                : defaultParagraph}
            </Text>
          </motion.div>
        </AnimatePresence>
      </Box>
    </VStack>
  );
};

export default YinYang;
