import { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CustomHeading from '../../components/CustomHeading';
import '../../assets/styles/expanded-cards-section.css';

const MotionBox = chakra(motion.div);

const images = [
  {
    url: 'https://images.unsplash.com/photo-1707327956851-30a531b70cda?...',
    title: 'Dive The Oceans',
  },
  {
    url: 'https://images.unsplash.com/photo-1416949929422-a1d9c8fe84af?...',
    title: 'See The Sights',
  },
  {
    url: 'https://images.unsplash.com/photo-1520601865139-98afd47b8b3c?...',
    title: 'Walk The Beaches',
  },
  {
    url: 'https://images.unsplash.com/photo-1558022103-603c34ab10ce?...',
    title: 'Explore The Forest',
  },
  {
    url: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?...',
    title: 'Climb A Tree',
  },
];

function ExpandingCardsSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleClick = index => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const gradients = [
    'linear-gradient(to right bottom, rgba(41, 152, 255, 0.85), rgba(86, 67, 250, 0.85))',
    'linear-gradient(to right bottom, rgba(255, 185, 0, 0.85), rgba(255, 119, 48, 0.85))',
    'linear-gradient(to right bottom, rgba(255, 223, 186, 0.85), rgba(135, 206, 250, 0.85))',
    'linear-gradient(to right bottom, rgba(0, 242, 96, 0.85), rgba(5, 117, 230, 0.85))',
    'linear-gradient(to right bottom, rgba(72, 239, 128, 0.85), rgba(0, 210, 255, 0.85))',
    'linear-gradient(to right bottom, rgba(232, 94, 255, 0.85), rgba(255, 204, 255, 0.85))',
  ];

  const parentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const headingVariants = {
    hidden: {
      y: 60,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    visible: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
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
      style={{
        willChange: 'transform',
      }}
    >
      <MotionBox variants={headingVariants} mb={4}>
        <CustomHeading mb={0}>Explore Nature</CustomHeading>
      </MotionBox>

      <MotionBox
        variants={containerVariants}
        width="90vw"
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        overflow="hidden"
      >
        {images.map((image, index) => (
          <MotionBox
            key={index}
            variants={cardVariants}
            custom={index}
            bgImage={`url(${image.url})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            borderRadius="3xl"
            cursor="pointer"
            position="relative"
            m={2}
            flex={isMobile ? 'none' : activeIndex === index ? 5 : 0.1}
            height={
              isMobile ? (activeIndex === index ? '300px' : '100px') : '80vh'
            }
            transition="flex 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)"
            onClick={() => handleClick(index)}
            style={{
              willChange: 'transform, flex',
            }}
          >
            <Flex
              bg={
                activeIndex === index
                  ? 'transparent'
                  : gradients[index % gradients.length]
              }
              borderRadius="3xl"
              height="100%"
              align={isMobile ? 'flex-end' : 'center'}
              justify="center"
              color="white"
              p={4}
            >
              {activeIndex === index ? (
                ''
              ) : (
                <Text
                  style={{ fontWeight: 200 }}
                  className={isMobile ? 'horizontal-text' : 'vertical-text'}
                >
                  {image.title}
                </Text>
              )}
            </Flex>
            <Box
              position="absolute"
              bottom="30px"
              left="20px"
              zIndex="1"
              className={`card__title ${
                activeIndex === index ? 'card__title--active' : ''
              }`}
              style={{
                transitionDelay: activeIndex === index ? '.5s' : '0s',
              }}
            >
              <span
                className={`card__title-span card__title-span--${index + 1}`}
              >
                {image.title}
              </span>
            </Box>
          </MotionBox>
        ))}
      </MotionBox>
    </Flex>
  );
}

export default ExpandingCardsSection;
