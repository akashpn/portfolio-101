import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

export interface SmoothPosition extends Position {
  vx: number;
  vy: number;
  velocity: number;
}

export const useSmoothFollow = (target: Position, stiffness = 0.1): SmoothPosition => {
  const [smoothPos, setSmoothPos] = useState<SmoothPosition>({ x: 0, y: 0, vx: 0, vy: 0, velocity: 0 });
  const currentPos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    // Set initial position without animation
    currentPos.current = target;
    setSmoothPos({ ...target, vx: 0, vy: 0, velocity: 0 });

    const animate = () => {
      const distanceX = target.x - currentPos.current.x;
      const distanceY = target.y - currentPos.current.y;

      velocity.current.x += distanceX * stiffness;
      velocity.current.y += distanceY * stiffness;

      // Apply friction
      velocity.current.x *= 0.9;
      velocity.current.y *= 0.9;

      currentPos.current.x += velocity.current.x;
      currentPos.current.y += velocity.current.y;
      
      const totalVelocity = Math.hypot(velocity.current.x, velocity.current.y);

      setSmoothPos({
        x: currentPos.current.x,
        y: currentPos.current.y,
        vx: velocity.current.x,
        vy: velocity.current.y,
        velocity: totalVelocity,
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [target, stiffness]);

  return smoothPos;
};