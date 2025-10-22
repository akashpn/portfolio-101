import React from 'react';
import { SectionTheme } from '../types';
import { SmoothPosition } from '../hooks/useSmoothFollow';

interface BlobProps {
  theme: SectionTheme;
  position: SmoothPosition;
}

const Blob: React.FC<BlobProps> = ({ theme, position }) => {
  const { x, y, vx, velocity } = position;
  
  // Create a more dynamic, fluid shape based on velocity
  const stretch = Math.min(velocity / 30, 0.4);
  const scaleX = 1 + stretch;
  const scaleY = 1 - stretch;
  const rotation = vx * 1.5; // Rotate based on horizontal direction

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-0 h-96 w-96 rounded-full opacity-50 blur-3xl"
      style={{
        transform: `translate(${x - 192}px, ${y - 192}px) rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
        backgroundColor: theme.glowColor.replace('0.2', '0.6').replace('0.25', '0.7'),
        transition: 'background-color 1500ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    />
  );
};

export default Blob;