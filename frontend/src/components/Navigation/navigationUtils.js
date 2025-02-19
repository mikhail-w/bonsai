export const getLinkPosition = (index, total, radius) => {
  // Adjust the starting angle to be slightly more left (105 degrees in radians)
  const angleOffset = Math.PI * 0.62; // Slightly reduced from original 0.6

  // Keep the original spread of 90 degrees but shift it left
  const angle = angleOffset + (index / total) * (Math.PI * 0.5);

  // Calculate positions with the same radius but shifted left
  const x = radius * Math.cos(angle) - 40; // Subtract 40px to shift everything left
  const y = radius * Math.sin(angle);

  return { x, y };
};
