// Animation variants for the container
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.5, // Slight delay before header starts
      staggerChildren: 0.5, // Time between each card animation
    },
  },
};

// Animation variants for the header
export const headerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 1,
      duration: 1.2, // Slower header animation
      ease: [0.215, 0.61, 0.355, 1], // Smooth easing
    },
  },
};

// Animation variants for the cards
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};
