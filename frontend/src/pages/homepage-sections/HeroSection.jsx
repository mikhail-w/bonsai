import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import heroImage from '../../assets/images/h3.png';
import CustomButton from '../../components/CustomButton';

// Parent container variants
const containerVariants = {
  initial: {},
  animate: {
    transition: {
      // Wait a bit longer before the first child animates
      delayChildren: 0.9,
      // Delay more between child animations
      staggerChildren: 1,
    },
  },
};

// Child fade + slide-up variant
const fadeUpChild = {
  initial: { opacity: 0, y: 60 }, // Slightly larger y-offset for a smoother slide
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      // Increase duration for a slower, smoother appearance
      duration: 1.2,
      ease: 'easeInOut',
    },
  },
};

// Child fade-only variant (for the sub-text)
const fadeInChild = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
    },
  },
};

function HeroSection() {
  return (
    <Box
      position="relative"
      height="85vh"
      bgImage={{
        base: `linear-gradient(to right bottom, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8)), url(${heroImage})`,
      }}
      bgSize="cover"
      bgPosition="center"
      clipPath="polygon(0 0, 100% 0, 100% 85%, 0 100%)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      zIndex="1"
      flexDirection="column"
    >
      {/* Hero Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.4)"
        zIndex="2"
      />

      {/* Hero Content with staggered children */}
      <Flex
        as={motion.div}
        flexDirection="column"
        alignItems="center"
        position="relative"
        zIndex="3"
        variants={containerVariants} // Parent variants
        initial="initial"
        animate="animate"
      >
        {/* Child 1: Heading */}
        <Text
          as={motion.p}
          variants={fadeUpChild}
          color="white"
          fontWeight={300}
          fontFamily="lato"
          fontSize={{ base: '3.2rem', md: '6rem', lg: '8rem' }}
          letterSpacing="0.3rem"
          mb={2}
        >
          BONSAI
        </Text>

        {/* Child 2: Sub-Text */}
        <Text
          as={motion.p}
          variants={fadeInChild}
          fontWeight={300}
          fontFamily="lato"
          // fontSize="sm"
          fontSize={{ base: '.65rem', md: '1rem', lg: '1.2rem' }}
          color="white"
          mb={3}
          textTransform="uppercase"
        >
          Cultivating Serenity
        </Text>

        {/* Child 3: Button */}
        <Box as={motion.div} variants={fadeUpChild}>
          <CustomButton
            to="/products"
            color="black"
            bg="rgba(255, 255, 255, 0.9)"
            padding=".5rem 1.5rem"
            fontSize={{ base: '.67rem', md: '1rem', lg: '1.2rem' }}
            _hover={{
              border: '1px solid',
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.08)',
            }}
            _focus={{ boxShadow: 'outline', outline: 'none' }}
          >
            EXPLORE NATURE
          </CustomButton>
        </Box>
      </Flex>
    </Box>
  );
}

export default HeroSection;
