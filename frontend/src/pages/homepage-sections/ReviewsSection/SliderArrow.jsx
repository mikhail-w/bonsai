import { IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const SliderArrow = ({ direction, onClick }) => {
  const positionValue = useBreakpointValue({
    base: '3px',
    md: '3px',
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
      color="white"
      backgroundColor="#38a169"
      borderRadius="full"
      size="lg"
      _hover={{ transform: 'translateY(-50%) scale(1.1)' }}
      _active={{ backgroundColor: '#38a169' }}
      _focus={{ boxShadow: 'none', backgroundColor: '#38a169' }}
      _focusVisible={{ boxShadow: 'none' }}
      transition="all 0.2s"
      sx={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
        userSelect: 'none',
      }}
    />
  );
};

export default SliderArrow;
