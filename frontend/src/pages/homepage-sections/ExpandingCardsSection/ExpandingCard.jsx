import { Box, Flex, Text, chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { cardVariants } from './animationVariants';
import { gradients } from './data';
import '../../../assets/styles/expanded-cards-section.css';

const MotionBox = chakra(motion.div);

function ExpandingCard({ index, image, activeIndex, handleClick, isMobile }) {
  return (
    <MotionBox
      // Enable layout animations for smooth transitions
      layout
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
      flexShrink={0}
      minWidth="0"
      maxWidth="100vw"
      flex={isMobile ? 'none' : activeIndex === index ? 5 : 0.1}
      height={isMobile ? (activeIndex === index ? '300px' : '100px') : '80vh'}
      // Adjust the transition values for mobile mode to be smoother.
      transition={
        isMobile
          ? {
              height: { duration: 0.8, ease: 'easeOut' },
              flex: { duration: 0.8, ease: 'easeOut' },
            }
          : 'flex 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), height 1.2s ease-in-out'
      }
      onClick={() => handleClick(index)}
      willChange="height, flex"
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
        {activeIndex !== index && (
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
        style={{ transitionDelay: activeIndex === index ? '.5s' : '0s' }}
      >
        <span className={`card__title-span card__title-span--${index + 1}`}>
          {image.title}
        </span>
      </Box>
    </MotionBox>
  );
}

export default ExpandingCard;
