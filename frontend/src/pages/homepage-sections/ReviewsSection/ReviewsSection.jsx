import { Box, useColorModeValue } from '@chakra-ui/react';
import CustomHeading from '../../../components/CustomHeading';
import ReviewsSlider from './ReviewsSlider';

const ReviewsSection = () => (
  <Box py={16} px={4} bg={useColorModeValue('gray.50', 'gray.900')}>
    <CustomHeading size="2xl">What Our Customers Say</CustomHeading>
    <ReviewsSlider />
  </Box>
);

export default ReviewsSection;
