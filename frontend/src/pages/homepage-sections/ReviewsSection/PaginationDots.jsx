import { Flex, Circle } from '@chakra-ui/react';

const PaginationDots = ({ realSlidesCount, activeDot, goToSlide }) => (
  <Flex justify="center" mt={6} gap={3} pb={2}>
    {Array.from({ length: realSlidesCount }).map((_, index) => (
      <Circle
        key={index}
        size="3"
        as="button"
        onClick={() => goToSlide(index)}
        bg={activeDot === index ? 'green.500' : 'gray.300'}
        transform={activeDot === index ? 'scale(1.25)' : 'scale(1)'}
        transition="all 0.2s"
      />
    ))}
  </Flex>
);

export default PaginationDots;
