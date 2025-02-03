export const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0, duration: 0.8, ease: 'easeOut' },
  },
};

export const cardsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.5,
      when: 'beforeChildren',
    },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

export const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5, // Adjust the delay based on card animation duration
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};
