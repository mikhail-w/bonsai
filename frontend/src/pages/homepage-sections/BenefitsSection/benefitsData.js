import m1 from '../../../assets/images/m8.jpg';
import m2 from '../../../assets/images/m7.jpg';
import m3 from '../../../assets/images/m3.jpg';
import m4 from '../../../assets/images/m5.jpg';

export const benefits = [
  {
    icon: '🌿',
    title: 'Connect with Nature',
    description:
      'Growing bonsai helps foster a deep connection with nature, bringing tranquility and peace into your home.',
    additional:
      'Caring for a bonsai fosters mindfulness and appreciation for nature, bringing seasonal beauty and tranquility into your home.',
    image: m1,
  },
  {
    icon: '🧘‍♂️',
    title: 'Reduce Stress',
    description:
      'The patience and care required for bonsai cultivation can help reduce stress and promote mindfulness.',
    additional:
      'The meditative practice of shaping and nurturing a bonsai helps lower stress, increase focus, and promote a sense of calm.',
    image: m2,
  },
  {
    icon: '💧',
    title: 'Improve Air Quality',
    description:
      'Bonsai plants purify the air by filtering toxins, making your indoor environment healthier.',
    additional:
      'Bonsai trees filter indoor pollutants and release oxygen, creating a fresher and healthier living environment.',
    image: m3,
  },
  {
    icon: '🌸',
    title: 'Enhance Home Decor',
    description:
      'Bonsai plants add a touch of elegance and zen to any room, enhancing your home decor naturally.',
    additional:
      'A bonsai’s natural elegance and artistic beauty enhance any space, adding a calming and sophisticated touch to your home.',
    image: m4,
  },
];

export const hoverColors = [
  {
    bg: 'linear-gradient(180deg, #E6F4EA 0%, #B4D6B4 100%)',
    text: '#000000',
    heading: '#fff',
  },
  { bg: 'rgba(93, 236, 107, 0.7)', text: '#000000', heading: '#F9F8F6' },
  { bg: 'rgba(166, 152, 218, 0.7)', text: '#000000', heading: '#FAFAED' },
  { bg: 'rgba(59, 205, 238, 0.7)', text: '#000000', heading: '#FAFAED' },
];

export const overlayColors = [
  'linear-gradient(to right bottom, rgba(93, 236, 107, 0.8), rgba(40, 180, 133, 0.8))',
  'linear-gradient(to right bottom, rgba(166, 152, 218, 0.8), rgba(142, 68, 173, 0.8))',
  'linear-gradient(to right bottom, rgba(59, 205, 238, 0.8), rgba(39, 125, 217, 0.8))',
  'linear-gradient(to right bottom, rgba(251, 92, 116, 0.8), rgba(227, 67, 51, 0.8))',
];

export const getOverlayGradient = colorMode =>
  colorMode === 'light'
    ? 'linear-gradient(to right bottom, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8))'
    : 'linear-gradient(to right bottom, rgba(45, 52, 54, 0.8), rgba(25, 42, 86, 0.8))';
