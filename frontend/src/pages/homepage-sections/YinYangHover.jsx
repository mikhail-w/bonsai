import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

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
      setActiveSection(prev => (prev === section ? null : section)); // Toggle on click for mobile
    } else {
      setActiveSection(section); // Hover behavior for non-mobile
    }
  };

  return (
    <VStack spacing={8} mt={-4} mb={12} align="center">
      {/* Yin-Yang Symbol */}
      <Box position="relative" width="200px" height="200px">
        <svg viewBox="0 0 240 240" width="100%" height="100%">
          <defs>
            <linearGradient
              id="blackGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: '#55c57a', stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#28b485', stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient
              id="whiteGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: '#28b485', stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#55c57a', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          {/* Base circle */}
          <circle
            cx="120"
            cy="120"
            r="115"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />

          {/* Green Half (default color) */}
          <path
            d="M120 5 A115 115 0 0 1 120 235 A57.5 57.5 0 0 1 120 120 A57.5 57.5 0 0 0 120 5Z"
            fill={activeSection === 'black' ? 'url(#blackGradient)' : '#f6f6f6'}
            cursor="pointer"
            onClick={() => handleInteraction('black')}
            onMouseEnter={() => !isMobile && handleInteraction('black')}
            onMouseLeave={() => !isMobile && setActiveSection(null)}
            style={{ transition: 'fill 0.3s ease-in-out' }}
          />

          {/* White Half */}
          <path
            d="M120 235 A115 115 0 0 1 120 5 A57.5 57.5 0 0 1 120 120 A57.5 57.5 0 0 0 120 235Z"
            fill={activeSection === 'white' ? 'url(#whiteGradient)' : 'white'}
            cursor="pointer"
            onClick={() => handleInteraction('white')}
            onMouseEnter={() => !isMobile && handleInteraction('white')}
            onMouseLeave={() => !isMobile && setActiveSection(null)}
            style={{ transition: 'fill 0.3s ease-in-out' }}
          />

          {/* Dots */}
          <circle
            cx="120"
            cy="62.5"
            r="12"
            fill={activeSection === 'black' ? '#28b485' : 'black'}
          />
          <circle
            cx="120"
            cy="177.5"
            r="12"
            fill={activeSection === 'white' ? 'gray' : 'white'}
          />
        </svg>
      </Box>

      {/* Instruction Text with Animation */}
      <AnimatePresence mode="wait">
        {!activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>

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
              fontSize={{ base: 'md', md: '2xl' }}
              color={textColor}
              textAlign="center"
              lineHeight="1.7"
              fontFamily="'Poppins', sans-serif"
              fontWeight={300}
              mx="auto"
              maxW={{ base: '90%', md: 'container.md' }}
            >
              {activeSection
                ? activeSection === 'black'
                  ? firstParagraph
                  : secondParagraph
                : defaultParagraph}
            </Text>
          </motion.div>
        </AnimatePresence>
      </Box>
    </VStack>
  );
};

export default YinYang;
