import { Box, useColorModeValue } from '@chakra-ui/react';
import CustomHeading from '../../components/CustomHeading';
import YinYangHover from './YinYangHover';

const AboutBonsaisSection = () => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      as="section"
      bg={bgColor}
      py={{ base: 10, md: 20 }}
      px={{ base: 5, md: 10 }}
      transition="background-color 0.3s ease-in-out"
    >
      <CustomHeading>Discover the Art of Bonsai</CustomHeading>
      <YinYangHover />
    </Box>
  );
};

export default AboutBonsaisSection;
