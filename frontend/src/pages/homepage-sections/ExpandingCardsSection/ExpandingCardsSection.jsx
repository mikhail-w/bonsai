import { useState } from 'react';
import {
  Flex,
  useBreakpointValue,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CustomHeading from '../../../components/CustomHeading';
import ExpandingCard from './ExpandingCard';
import {
  parentVariants,
  headingVariants,
  containerVariants,
} from './animationVariants';
import { images } from './data';

const MotionBox = chakra(motion.div);

function ExpandingCardsSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleClick = index => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <Flex
      as={MotionBox}
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      justify="center"
      align="center"
      bg={useColorModeValue('white', 'gray.800')}
      direction={{ base: 'column', xl: 'row' }}
      mt={100}
      maxH={{ base: '150vh', md: '130vh' }}
      marginBottom={{ base: '50px', md: '100px' }}
    >
      <MotionBox variants={headingVariants} mb={4}>
        <CustomHeading size="2xl" mb={0}>
          Explore Nature
        </CustomHeading>
      </MotionBox>

      <MotionBox
        variants={containerVariants}
        width="100vw"
        maxWidth="100vw"
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        overflow="hidden"
      >
        {images.map((image, index) => (
          <ExpandingCard
            key={index}
            index={index}
            image={image}
            activeIndex={activeIndex}
            handleClick={handleClick}
            isMobile={isMobile}
          />
        ))}
      </MotionBox>
    </Flex>
  );
}

export default ExpandingCardsSection;
