import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import heroImage from '../../assets/images/h3.png';
import CustomButton from '../../components/CustomButton';

const MotionBox = motion(Box);
const MotionText = motion(Text);

// **Title Animation (Runs First)**
const titleFadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};

// **Subtitle Animation (Appears After Title Finishes)**
const subtitleFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: 'easeOut', delay: 1.5 }, // Waits for title to finish
  },
};

// **Button Animation (Appears Last)**
const buttonFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: 'easeOut', delay: 2.5 }, // Waits for subtitle to finish
  },
};

const HeroSection = () => {
  return (
    <MotionBox
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
      initial="hidden"
      animate="visible"
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

      {/* Hero Content */}
      <Flex
        flexDirection="column"
        alignItems="center"
        position="relative"
        zIndex="3"
      >
        {/* Title (Appears First) */}
        <MotionText
          color="white"
          fontWeight={300}
          fontFamily="lato"
          fontSize={{ base: '3.2rem', md: '6rem', lg: '8rem' }}
          letterSpacing="0.3rem"
          mb={2}
          variants={titleFadeUp}
          initial="hidden"
          animate="visible"
        >
          BONSAI
        </MotionText>

        {/* Subtitle (Appears After Title Finishes) */}
        <MotionText
          fontWeight={300}
          fontFamily="lato"
          fontSize={{ base: '.65rem', md: '1rem', lg: '1.2rem' }}
          color="white"
          mb={3}
          textTransform="uppercase"
          variants={subtitleFadeUp}
          initial="hidden"
          animate="visible"
        >
          Cultivating Serenity
        </MotionText>

        {/* Button (Appears Last, After Subtitle) */}
        <MotionBox variants={buttonFadeUp} initial="hidden" animate="visible">
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
        </MotionBox>
      </Flex>
    </MotionBox>
  );
};

export default HeroSection;
