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
const MotionCircle = motion.circle;
const MotionPath = motion.path;

const YinYang = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const bColor = useColorModeValue('rgba(184, 198, 209, 0.47)', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const bgColor = useColorModeValue('#F8F8F8', 'rgba(114, 115, 116, 0.96)');

  const defaultParagraph =
    'Discover the art where patience and nature blend harmoniously. Explore our journey into tranquility and craftsmanship.';
  const firstParagraph =
    'Our collection features meticulously crafted bonsais for every level of enthusiast, from beginners to seasoned artists. We also offer high-quality tools, pots, and guides to help you nurture your miniature masterpiece.';
  const secondParagraph =
    "Whether you're seeking to bring tranquility to your home or searching for the perfect gift, We are your destination for all things bonsai. Explore our shop, dive into our care guides, and join a community of bonsai lovers worldwide.";

  const handleInteraction = section => {
    if (isMobile) {
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

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  };

  return (
    <VStack spacing={8} mt={-4} mb={12} align="center">
      <Text
        mt={6}
        fontSize={{ base: 'lg', md: 'xl' }}
        color={textColor}
        textAlign="center"
        opacity={0.7}
      >
        {isMobile
          ? 'Tap the circle to learn about us'
          : 'Hover over the circle to learn about us'}
      </Text>

      <Box
        position="relative"
        width="200px"
        height="200px"
        sx={{
          svg: {
            WebkitTapHighlightColor: 'transparent',
            overflow: 'visible', // Allow SVG to overflow its container
          },
          'svg path, svg circle': {
            outline: 'none',
          },
        }}
      >
        <svg
          // Added padding to viewBox to accommodate glow
          viewBox="-20 -20 280 280"
          width="100%"
          height="100%"
          onMouseLeave={handleMouseLeave}
          style={{ overflow: 'visible' }} // Ensure glow isn't clipped
        >
          <defs>
            <filter id="greenGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.196   
                        0 0 0 0 0.804  
                        0 0 0 0 0.196  
                        0 0 0 0.7 0"
              />
              <feBlend in="SourceGraphic" in2="blur" mode="normal" />
            </filter>

            <linearGradient
              id="hoverBlackGradient"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(50, 205, 50, 0.8)" />
              <stop offset="100%" stopColor="rgba(11, 163, 96)" />
            </linearGradient>

            <linearGradient
              id="hoverWhiteGradient"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="2.3%" stopColor="rgba(168, 251, 60, 0.9)" />
              <stop offset="98.3%" stopColor="rgb(87, 209, 101)" />
            </linearGradient>

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

          {/* Base Circle with Glow */}
          <MotionCircle
            cx="120"
            cy="120"
            r="115"
            fill={bgColor}
            stroke={bColor}
            strokeWidth="1"
            filter="url(#greenGlow)"
            animate={activeSection ? {} : pulseAnimation}
          />

          {/* Rotating Dash */}
          <MotionPath
            d="M120 5 A115 115 0 0 1 235 120 A115 115 0 0 1 120 235 A115 115 0 0 1 5 120 A115 115 0 0 1 120 5"
            fill="none"
            stroke="#50CD32"
            strokeWidth="2"
            strokeDasharray="40,682.3"
            strokeDashoffset="0"
            opacity={activeSection ? 0 : 1}
            animate={
              activeSection
                ? {
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }
                : {
                    opacity: 1,
                    strokeDashoffset: [-722.3, 0],
                    transition: {
                      opacity: { duration: 0.3 },
                      strokeDashoffset: {
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                    },
                  }
            }
          />

          <path
            d="M120 5 A115 115 0 0 1 120 235 A57.5 57.5 0 0 1 120 120 A57.5 57.5 0 0 0 120 5Z"
            fill="url(#hoverBlackGradient)"
            mask="url(#blackFillMask)"
            cursor="pointer"
            onMouseEnter={() => !isMobile && handleInteraction('black')}
            onClick={() => isMobile && handleInteraction('black')}
          />

          <path
            d="M120 235 A115 115 0 0 1 120 5 A57.5 57.5 0 0 1 120 120 A57.5 57.5 0 0 0 120 235Z"
            fill="url(#hoverWhiteGradient)"
            mask="url(#whiteFillMask)"
            cursor="pointer"
            onMouseEnter={() => !isMobile && handleInteraction('white')}
            onClick={() => isMobile && handleInteraction('white')}
          />

          <circle
            cx="120"
            cy="62.5"
            r="12"
            cursor="pointer"
            onMouseEnter={() => !isMobile && handleInteraction('white')}
            onClick={() => isMobile && handleInteraction('white')}
            fill={
              activeSection === 'black'
                ? '#28b485'
                : activeSection
                ? 'white'
                : 'transparent'
            }
          />
          <circle
            cx="120"
            cy="177.5"
            r="12"
            cursor="pointer"
            onMouseEnter={() => !isMobile && handleInteraction('black')}
            onClick={() => isMobile && handleInteraction('black')}
            fill={
              activeSection === 'white'
                ? 'rgba(50, 205, 50, 0.8)'
                : activeSection
                ? 'white'
                : 'transparent'
            }
          />
        </svg>
      </Box>

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
