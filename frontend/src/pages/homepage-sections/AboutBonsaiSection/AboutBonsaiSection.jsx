import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CustomHeading from '../../../components/CustomHeading';
import YinYangHover from './YinYangHover';

const AboutBonsaiSection = () => {
  const bgColor = useColorModeValue('white', 'gray.800');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
        delayChildren: 0.5,
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 5,
        ease: [0.6, 0.01, 0.05, 0.95],
        opacity: { duration: 5 },
        y: { duration: 5 },
        scale: { duration: 5 },
      },
    },
  };

  const yinYangVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <Box
      as="section"
      mt={10}
      bg={bgColor}
      py={{ base: 10, md: 20 }}
      px={{ base: 5, md: 10 }}
      overflow="hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header - First Fade-in */}
        <Box as={motion.div} variants={headerVariants}>
          <CustomHeading size="2xl">Discover the Art of Bonsai</CustomHeading>
        </Box>

        {/* YinYang Symbol - Simple Fade-in */}
        <Box as={motion.div} variants={yinYangVariants} mt={10}>
          <YinYangHover />
        </Box>
      </motion.div>
    </Box>
  );
};

export default AboutBonsaiSection;
