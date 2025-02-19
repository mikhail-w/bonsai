import React from 'react';
import { motion } from 'framer-motion';

const NavigationCircle = ({ isOpen, hoveredLink }) => {
  // Define base colors without opacity
  const linkColors = {
    default: {
      start: '1D976C',
      end: '93F9B9',
    },
    Login: {
      start: '74D680',
      end: '378B29',
    },
    Blog: {
      start: '049F6C',
      end: 'C2FE71',
    },
    Cart: {
      start: '0BA360',
      end: '32CD32',
    },
    Shop: {
      start: '3FB53F',
      end: 'A8FB3C',
    },
    Logout: {
      start: '3FAD8D',
      end: 'D4F2EA',
    },
  };

  const getBackgroundStyle = colorKey => {
    const colors = linkColors[colorKey] || linkColors.default;
    return `linear-gradient(
      rgba(${hexToRgb(colors.start)}, 0.9),
      rgba(${hexToRgb(colors.end)}, 0.9)
    )`;
  };

  // Helper function to convert hex to RGB
  const hexToRgb = hex => {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  const currentBackground = isOpen
    ? getBackgroundStyle(hoveredLink)
    : `linear-gradient(
        rgba(116, 214, 128, 0.6),
        rgba(116, 214, 128, 0.6)
      )`;

  return (
    <>
      {/* Base blur layer */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 15 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          zIndex: 1,
        }}
      />

      {/* Color overlay layer */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 15 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: currentBackground,
          zIndex: 2,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default NavigationCircle;
