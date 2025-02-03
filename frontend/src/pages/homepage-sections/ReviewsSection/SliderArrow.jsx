// src/components/SliderArrow.js
import { IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const SliderArrow = ({ direction, onClick }) => {
  const positionValue = useBreakpointValue({
    base: '2px',
    md: '1px',
  });

  return (
    <IconButton
      aria-label={`${direction} slide`}
      icon={direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      onClick={onClick}
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      {...(direction === 'next'
        ? { right: positionValue }
        : { left: positionValue })}
      zIndex={2}
      color={'white'}
      backgroundColor={'#38a169'}
      borderRadius="full"
      size="lg"
      _hover={{ transform: 'translateY(-50%) scale(1.1)' }}
      _active={{ backgroundColor: '#38a169' }}
      _focus={{ boxShadow: 'none', backgroundColor: '#38a169' }}
      transition="all 0.2s"
    />
  );
};

export default SliderArrow;
