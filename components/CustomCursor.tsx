import React, { useState, useEffect } from 'react';
import { useSmoothFollow } from '../hooks/useSmoothFollow';
import { SectionTheme } from '../types';

interface CustomCursorProps {
  activeTheme: SectionTheme;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ activeTheme }) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Use different stiffness values for a subtle parallax effect
  const dotPosition = useSmoothFollow(mousePosition, 0.4); 
  const ringPosition = useSmoothFollow(mousePosition, 0.2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('a, button')) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('a, button')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const ringSize = isHovering ? 40 : 24;
  const dotSize = isHovering ? 0 : 8;

  return (
    <>
      <div 
        className="cursor-ring"
        style={{
          transform: `translate(${ringPosition.x - ringSize / 2}px, ${ringPosition.y - ringSize / 2}px)`,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderColor: activeTheme.glowColor.replace('0.2', '0.5').replace('0.25', '0.6'),
        }}
      />
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${dotPosition.x - dotSize / 2}px, ${dotPosition.y - dotSize / 2}px)`,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
